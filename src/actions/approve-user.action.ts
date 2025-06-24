"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function approveUserAction(userId: string) {
  try {
    // Check if the current user is an admin
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return { error: "Unauthorized" };
    }

    if (session.user.role !== "ADMIN") {
      return { error: "Unauthorized. Only admins can approve users." };
    }

    // Update the user's approval status
    await prisma.user.update({
      where: { id: userId },
      data: { isApproved: true },
    });

    // Revalidate the admin dashboard page
    revalidatePath("/admin/dashboard");

    return { success: true };
  } catch (error) {
    console.error("Error approving user:", error);
    return { error: "Failed to approve user" };
  }
} 