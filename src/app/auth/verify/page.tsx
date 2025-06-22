import { GalleryVerticalEnd } from "lucide-react";

import Link from "next/link";
import { ReturnButton } from "@/components/return-button";
import { SendVerificationEmailForm } from "@/components/send-email-verification-form";
import { redirect } from "next/navigation";

interface PageProps {
  searchParams: Promise<{ error: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const error = (await searchParams).error;

  if (!error) redirect("/api/auth/redirect");
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Acme Inc.
          </Link>
          <ReturnButton href="/auth/login" label="Login" />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <div className="mb-8 text-center">
              <h1 className="text-2xl font-bold mb-2">Verify your email</h1>
              <p className="text-destructive">
                {error === "invalid_token" || error === "token_expired"
                  ? "The verification link is invalid or has expired. Please request a new verification link."
                  : "Oops! Something went wrong. Please try again."}
              </p>
            </div>
            <SendVerificationEmailForm />
          </div>
        </div>
      </div>
    </div>
  );
}
