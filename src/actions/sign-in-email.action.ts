"use server";

import { loginSchema } from "@/components/schemas/login-schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { APIError } from "better-auth/api";
import { prisma } from "@/lib/prisma";
import { ErrorCode } from "@/lib/auth";
import { redirect } from "next/navigation";

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
    await auth.api.signInEmail({
      headers: headersList,
      body: {
        email,
        password,
      },
    });

    // Try to get session first
    const session = await auth.api.getSession({
      headers: headersList,
    });

    // If session has role, use it
    if (session?.user?.role) {
      return { error: null, role: session.user.role };
    }

    // Fallback: Look up the user directly from the database
    const user = await prisma.user.findUnique({
      where: { email },
      select: { role: true },
    });

    //if user is found, return the role
    if (user) {
      // Return the role as a string
      return { error: null, role: user.role.toString() };
    }

    //if user is not found, return the USER role
    return { error: null, role: "USER" };
  } catch (err) {
    if (err instanceof APIError) {
      const errCode = err.body ? (err.body.code as ErrorCode) : "UNKNOWN";

      switch (errCode) {
        case "EMAIL_NOT_VERIFIED":
          redirect("/auth/verify?error=email_not_verified");
        case "ACCOUNT_PENDING_APPROVAL":
          return {
            //auth.ts error message for approval pending in health provider
            error: err.message,
          };
        default:
          return { error: err.message };
      }
    }

    return { error: "Internal Server Error" };
  }
}
