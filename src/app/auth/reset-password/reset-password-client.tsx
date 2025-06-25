"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ResetPasswordForm } from "@/components/reset-password-form";
import { Suspense } from "react";

export function ResetPasswordClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const tokenParam = searchParams.get("token");
    if (!tokenParam) {
      router.push("/auth/login");
    } else {
      setToken(tokenParam);
    }
    setIsLoading(false);
  }, [searchParams, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!token) {
    return null; // This will not render as the router.push will redirect
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Reset your password</h1>
      <p className="text-sm text-muted-foreground">
        Please enter your new password.
      </p>
      <Suspense fallback={<div>Loading form...</div>}>
        <ResetPasswordForm token={token} />
      </Suspense>
    </div>
  );
} 