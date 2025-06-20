"use server";

import { loginSchema } from "@/components/schemas/login-schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { APIError } from "better-auth/api";

export async function signInEmailAction(formData: FormData) {
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));

  // Validate using the imported login schema
  const result = loginSchema.safeParse({ email, password });

  if (!result.success) {
    // Get the first error message
    const fieldErrors = result.error.flatten().fieldErrors;
    const firstError =
      Object.values(fieldErrors)[0]?.[0] || "Invalid form data";
    return { error: firstError };
  }

  try {
    await auth.api.signInEmail({
      headers: await headers(),
      body: {
        email,
        password,
      },
    });

    return { error: null };
  } catch (err) {
    if (err instanceof APIError) {
      return { error: err.message };
    }

    return { error: "Internal Server Error" };
  }
}
