"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { toast } from "sonner";

import { signUpEmailAction } from "@/actions/sign-up-email.action";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  registerSchema,
  type RegisterSchemaType,
} from "@/components/schemas/register-schema";
import { useZodForm } from "@/components/hooks/use-zod-form";

interface RegisterFormProps extends React.ComponentProps<"form"> {
  className?: string;
}

export function RegisterForm({ className, ...props }: RegisterFormProps) {
  const { errors, handleSubmit, setErrors } = useZodForm(registerSchema);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onFormSubmit = async (data: RegisterSchemaType, formData: FormData) => {
    setSubmitError(null);
    setIsLoading(true);

    try {
      toast.loading("Signing up...", {
        id: "register",
      });

      const response = await signUpEmailAction(formData);

      if (response?.error) {
        throw new Error(response.error);
      }

      toast.success("Registration complete. You're all set.", {
        id: "register",
      });
      router.push("/auth/login");
    } catch (error: any) {
      toast.error(error.message || "Failed to register", {
        id: "register",
      });
      setSubmitError(error.message || "Failed to register");
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
        <h1 className="text-2xl font-bold">Sign Up</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Create a new account
        </p>
      </div>

      {submitError && (
        <div className="text-red-500 text-sm text-center">{submitError}</div>
      )}

      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" placeholder="John Mike" />
          {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
        </div>

        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="m@example.com"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        <div className="grid gap-3">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" name="password" />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password}</p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Signing Up..." : "Sign Up"}
        </Button>

        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or signup with
          </span>
        </div>
      </div>
    </form>
  );
}
