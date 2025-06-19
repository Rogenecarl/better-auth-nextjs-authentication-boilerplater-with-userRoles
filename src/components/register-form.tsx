"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { toast } from "sonner";

import { signUp } from "@/lib/auth-client";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useZodForm } from "@/components/hooks/use-zod-form";
import { useState } from "react";

interface RegisterFormProps extends React.ComponentProps<"form"> {
  className?: string;
}

// Define validation schema with Zod
const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm({ className, ...props }: RegisterFormProps) {
  const { errors, handleSubmit, setErrors } = useZodForm(registerSchema);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: async (data: RegisterFormValues) => {
      // Clear any previous errors
      setSubmitError(null);
      
      toast.loading("Creating account...", {
        id: "signup",
      });
      
      const { data: response, error } = await signUp.email(data);
      
      if (error) {
        throw new Error(error.message || "Failed to create account");
      }
      
      return response;
    },
    onSuccess: () => {
      toast.success("Account created successfully", {
        id: "signup",
      });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create account", {
        id: "signup",
      });
      setSubmitError(error.message || "Failed to create account");
    },
  });

  const onFormSubmit = (data: RegisterFormValues) => {
    setSubmitError(null);
    mutation.mutate(data);
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

        <Button type="submit" className="w-full" disabled={mutation.isPending}>
          {mutation.isPending ? "Signing Up..." : "Sign Up"}
        </Button>

        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or signup with
          </span>
        </div>

        <Button variant="outline" className="w-full" type="button">
          <svg
            className="mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
              fill="currentColor"
            />
          </svg>
          Continue with Google
        </Button>
      </div>

      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link href="/auth/login" className="underline underline-offset-4">
          Sign In
        </Link>
      </div>
    </form>
  );
}
