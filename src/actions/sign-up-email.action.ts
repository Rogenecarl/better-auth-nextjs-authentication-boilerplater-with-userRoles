"use server";

import {
  registerSchema,
  type RegisterSchemaType,
} from "@/components/schemas/register-schema";
import { auth } from "@/lib/auth";

// Define response type for better type safety
type ActionResponse = {
  data: { id?: string; email?: string; name?: string } | null;
  error: { 
    message: string;
    errors?: Record<string, string>;
  } | null;
};

// Validate input data using the shared schema
const validateRegistration = async (formData: RegisterSchemaType) => {
  const result = registerSchema.safeParse(formData);

  if (!result.success) {
    return {
      validated: false,
      error: {
        message: "Invalid form data",
        errors: result.error.flatten().fieldErrors,
      },
      data: null,
    };
  }

  return {
    validated: true,
    data: result.data,
  };
};

export async function signUpEmailAction(formData: RegisterSchemaType): Promise<ActionResponse> {
  try {
    // Validate input data
    const validationResult = await validateRegistration(formData);

    if (!validationResult.validated) {
      // Handle validation error - transform possible string arrays to strings
      const fieldErrors: Record<string, string> = {};
      
      if (validationResult.error?.errors) {
        Object.entries(validationResult.error.errors).forEach(([key, value]) => {
          fieldErrors[key] = Array.isArray(value) ? value[0] : String(value);
        });
      }
      
      return {
        error: {
          message: "Invalid form data",
          errors: fieldErrors,
        },
        data: null,
      };
    }

    if (!validationResult.data) {
      return {
        error: { message: "Invalid form data" },
        data: null,
      };
    }

    // Call authentication API to sign up user
    try {
      const user = await auth.api.signUpEmail({
        body: {
          name: validationResult.data.name,
          email: validationResult.data.email,
          password: validationResult.data.password,
        },
      });

      // Return successful response with user data
      return {
        data: {
          id: user.user.id,
          email: user.user.email,
          name: user.user.name,
        },
        error: null,
      };
    } catch (signupError: any) {
      // Handle specific email-in-use error
      if (signupError.message?.toLowerCase().includes("email") && 
          signupError.message?.toLowerCase().includes("use")) {
        return {
          error: { 
            message: "Email already in use",
            errors: { email: "This email is already registered" }
          },
          data: null,
        };
      }
      
      // Handle other signup errors
      return {
        error: { 
          message: signupError.message || "Failed to create account",
        },
        data: null,
      };
    }
    
  } catch (error: any) {
    console.error("Sign up error:", error);
    return {
      error: { message: error?.message || "Failed to create account" },
      data: null,
    };
  }
}
