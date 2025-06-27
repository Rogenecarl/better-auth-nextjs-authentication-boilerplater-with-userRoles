"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Type for user data returned to client
export type UserData = {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
  status: string;
};

// Fetch all users (admin only)
export async function fetchUsersAction() {
  try {
    // Check if the current user is an admin
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return { error: "Unauthorized", data: null };
    }

    if (session.user.role !== "ADMIN") {
      return {
        error: "Unauthorized. Only admins can access this data.",
        data: null,
      };
    }

    // Fetch all users
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "asc",
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return {
      data: users as UserData[],
      currentUserId: session.user.id,
      error: null,
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    return { error: "Failed to fetch users", data: null };
  }
}

// Approve a user (admin only)
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
      data: { status: "ACTIVE" },
    });

    // Revalidate the admin dashboard page
    revalidatePath("/admin/dashboard");

    return { success: true, error: null };
  } catch (error) {
    console.error("Error approving user:", error);
    return { error: "Failed to approve user" };
  }
}

// Delete a user (admin only)
export async function deleteUserAction(userId: string) {
  try {
    // Check if the current user is an admin
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return { error: "Unauthorized" };
    }

    if (session.user.role !== "ADMIN") {
      return { error: "Unauthorized. Only admins can delete users." };
    }

    // Don't allow deleting admin users or the current user
    const userToDelete = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    if (!userToDelete) {
      return { error: "User not found" };
    }

    if (userToDelete.role === "ADMIN") {
      return { error: "Cannot delete admin users" };
    }

    if (userId === session.user.id) {
      return { error: "Cannot delete your own account" };
    }

    // Delete the user
    await prisma.user.delete({
      where: { id: userId },
    });

    // Revalidate the admin dashboard page
    revalidatePath("/admin/dashboard");

    return { success: true, error: null };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { error: "Failed to delete user" };
  }
}
