"use server";

import {
  loginSchema,
  type LoginSchemaType,
} from "@/components/schemas/login-schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

type ActionResponse = {
  data: { id?: string; email?: string } | null;
  error: {
    message: string;
    errors?: Record<string, string>;
  } | null;
};

// Validate input data using the shared schema
const validateLogin = async (formData: LoginSchemaType) => {
  const result = loginSchema.safeParse(formData);

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

export async function signInEmailAction(
  formData: LoginSchemaType
): Promise<ActionResponse> {
  try {
    // Validate input data
    const validationResult = await validateLogin(formData);

    if (!validationResult.validated) {
      // Handle validation error - transform possible string arrays to strings
      const fieldErrors: Record<string, string> = {};

      if (validationResult.error?.errors) {
        Object.entries(validationResult.error.errors).forEach(
          ([key, value]) => {
            fieldErrors[key] = Array.isArray(value) ? value[0] : String(value);
          }
        );
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

    // Call authentication API to sign in user
    try {
      const user = await auth.api.signInEmail({
        headers: await headers(),
        body: {
          email: validationResult.data.email,
          password: validationResult.data.password,
        },
      });

      return {
        data: {
          id: user.user.id,
          email: user.user.email,
        },
        error: null,
      };
    } catch (signinError: any) {
      // Handle specific email-not-found error
      if (
        signinError.message?.toLowerCase().includes("email") &&
        signinError.message?.toLowerCase().includes("not found")
      ) {
        return {
          error: {
            message: "Invalid credentials",
            errors: { email: "Invalid email or password" },
          },
          data: null,
        };
      }

      // Handle other signin errors
      return {
        error: {
          message: signinError.message || "Failed to sign in",
        },
        data: null,
      };
    }
    // Handle other signin errors
  } catch (error: any) {
    console.error("Sign in error:", error);
    return {
      error: { message: error?.message || "Failed to sign in" },
      data: null,
    };
  }
}
