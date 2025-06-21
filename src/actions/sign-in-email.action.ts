"use server";

import { loginSchema } from "@/components/schemas/login-schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { APIError } from "better-auth/api";
import { prisma } from "@/lib/prisma";

// Helper function to add delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function signInEmailAction(formData: FormData) {
  const headersList = await headers();

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
    // Authenticate the user
    const authResponse = await auth.api.signInEmail({
      headers: headersList,
      body: {
        email,
        password,
      },
    });

    console.log("Auth response:", authResponse);

    // Add a small delay
    await delay(500);

    // Try to get session first
    const session = await auth.api.getSession({
      headers: headersList,
    });

    console.log("Session after delay:", session);

    // If session has role, use it
    if (session?.user?.role) {
      return { error: null, role: session.user.role };
    }

    // Fallback: Look up the user directly from the database
    const user = await prisma.user.findUnique({
      where: { email },
      select: { role: true }
    });

    console.log("User from database:", user);

    if (user) {
      // Return the role as a string
      return { error: null, role: user.role.toString() };
    }

    // Default to USER role if nothing else works
    return { error: null, role: "USER" };
  } catch (err) {
    console.error("Login error:", err);
    if (err instanceof APIError) {
      return { error: err.message };
    }

    return { error: "Internal Server Error" };
  }
}
