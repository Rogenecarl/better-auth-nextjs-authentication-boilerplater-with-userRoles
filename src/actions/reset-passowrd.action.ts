"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function resetPasswordAction(formData: FormData, token: string) {
    const password = String(formData.get("password"));
    const confirmPassword = String(formData.get("confirmPassword"));

    if (password !== confirmPassword) {
        return { error: "Passwords do not match" };
    }

    try {
        await auth.api.resetPassword({
            headers: await headers(),
            body: {
                newPassword: password,
                token,
            },
        });
        
        return { success: true };
    } catch (error) {
        console.error("Error resetting password:", error);
        return { error: "Failed to reset password" };
    }
}