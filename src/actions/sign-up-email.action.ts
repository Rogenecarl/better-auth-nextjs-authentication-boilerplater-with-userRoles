"use server";

import { registerSchema } from "@/components/schemas/register-schema";
import { auth, ErrorCode } from "@/lib/auth";
import { headers } from "next/headers";
import { APIError } from "better-auth/api";

export async function signUpEmailAction(formData: FormData) {
  const name = String(formData.get("name"));
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));

  // Validate using the imported register schema
  const result = registerSchema.safeParse({ name, email, password });

  if (!result.success) {
    // Get the first error message
    const fieldErrors = result.error.flatten().fieldErrors;
    const firstError =
      Object.values(fieldErrors)[0]?.[0] || "Invalid form data";
    return { error: firstError };
  }

  try {
    await auth.api.signUpEmail({
      headers: await headers(),
      body: {
        name,
        email,
        password,
        role: "USER",
      },
    });

    return { error: null };
  } catch (err) {
    if (err instanceof APIError) {
      const errCode = err.body ? (err.body.code as ErrorCode) : "UNKNOWN";

      switch (errCode) {
        case "USER_ALREADY_EXISTS": {
          return { error: "Something went wrong. Please try again." };
        }
        case "INVALID_PASSWORD": {
          return { error: "Invalid password" };
        }
        case "INVALID_EMAIL": {
          return {
            error: "Invalid email. Please enter a valid email address.",
          };
        }
        default: {
          return { error: err.message };
        }
      }
    }

    return { error: "Internal Server Error" };
  }
}
