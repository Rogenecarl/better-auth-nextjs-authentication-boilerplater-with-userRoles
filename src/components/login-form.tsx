"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { toast } from "sonner";

import { signInEmailAction } from "@/actions/sign-in-email.action";
import {
  loginSchema,
  type LoginSchemaType,
} from "@/components/schemas/login-schema";
import { useZodForm } from "@/components/hooks/use-zod-form";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface LoginFormProps extends React.ComponentProps<"form"> {
  className?: string;
}

export function LoginForm({ className, ...props }: LoginFormProps) {
  const { errors, handleSubmit, setErrors } = useZodForm(loginSchema);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onFormSubmit = async (data: LoginSchemaType, formData: FormData) => {
    setSubmitError(null);
    setIsLoading(true);

    try {
      toast.loading("Logging in...", {
        id: "login",
      });

      const response = await signInEmailAction(formData);
      console.log("Login response:", response);

      if (response?.error) {
        throw new Error(response.error);
      }

      toast.success("Logged in successfully", {
        id: "login",
      });


      // Normalize role for comparison
      const userRole = String(response.role || "").toUpperCase();
      console.log("User role for routing:", userRole);

      // Handle routing based on role
      switch (userRole) {
        case "ADMIN":
          console.log("Redirecting to admin dashboard");
          router.push("/admin/dashboard");
          break;
        case "HEALTH_PROVIDER":
          console.log("Redirecting to health provider dashboard");
          router.push("/healthproviders/dashboard");
          break;
        default:
          console.log("Redirecting to user profile");
          router.push("/profile");
          break;
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to login", {
        id: "login",
      });
      setSubmitError(error.message || "Failed to login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>

      {submitError && (
        <div className="text-red-500 text-sm text-center">{submitError}</div>
      )}

      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email}</p>
          )}
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input id="password" name="password" type="password" />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password}</p>
          )}
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </Button>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>
      </div>
    </form>
  );
}
