"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

import { signUpProviderAction } from "@/actions/sign-up-provider.action";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  providerRegisterSchema,
  type ProviderRegisterSchemaType,
} from "@/components/schemas/register-schema";
import { useZodForm } from "@/components/hooks/use-zod-form";

interface RegisterFormProps extends React.ComponentProps<"form"> {
  className?: string;
}

export function RegisterProviderForm({
  className,
  ...props
}: RegisterFormProps) {
  const { errors, handleSubmit } = useZodForm(
    providerRegisterSchema
  );
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onFormSubmit = async (
    data: ProviderRegisterSchemaType,
    formData: FormData
  ) => {
    setSubmitError(null);
    setIsLoading(true);

    try {
      toast.loading("Signing up...", {
        id: "register",
      });

      const response = await signUpProviderAction(formData);

      if (response?.error) {
        throw new Error(response.error);
      }

      toast.success(
        "Registration complete. Please wait for admin approval before logging in.",
        {
          id: "register",
        }
      );
      router.push("/auth/register/success");
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to register";
      toast.error(errorMessage, {
        id: "register",
      });
      setSubmitError(errorMessage);
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
        <h1 className="text-2xl font-bold">Healthcare Provider Sign Up</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Create a new healthcare provider account
        </p>
      </div>

      {submitError && (
        <div className="text-red-500 text-sm text-center">{submitError}</div>
      )}

      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" name="name" placeholder="Dr. John Smith" />
          {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
        </div>

        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="doctor@example.com"
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

        <div className="pt-4 text-center text-sm">
          <p className="text-muted-foreground">
            Your account will require admin approval before you can log in.
          </p>
        </div>
      </div>
    </form>
  );
}
