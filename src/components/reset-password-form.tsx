"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { resetPasswordAction } from "@/actions/reset-passowrd.action";

interface ResetPasswordFormProps {
  token: string;
}

export const ResetPasswordForm = ({ token }: ResetPasswordFormProps) => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    const formData = new FormData(evt.target as HTMLFormElement);
    setIsPending(true);
    
    try {
      toast.loading("Resetting password...", {
        id: "reset-password",
      });

      const response = await resetPasswordAction(formData, token);

      if (response?.error) {
        throw new Error(response.error);
      }

      toast.success("Password reset successfully!", {
        id: "reset-password",
      });
      
      // Redirect to login page after successful reset
      setTimeout(() => {
        router.push("/auth/login");
      }, 1500);
      
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to reset password";
      toast.error(errorMessage, {
        id: "reset-password",
      });
      setIsPending(false);
    }
  }
  
  return (
    <form onSubmit={handleSubmit} className="max-w-sm w-full space-y-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="password">Password</Label>
        <Input type="password" id="password" name="password" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="confirmPassword">Confirm password</Label>
        <Input type="password" id="confirmPassword" name="confirmPassword" />
      </div>
      <Button type="submit" disabled={isPending}>
        {isPending ? "Resetting..." : "Reset password"}
      </Button>
    </form>
  );
};
