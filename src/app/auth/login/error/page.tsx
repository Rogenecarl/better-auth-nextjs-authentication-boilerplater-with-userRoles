import { GalleryVerticalEnd } from "lucide-react";

import Link from "next/link";
import { ReturnButton } from "@/components/return-button";

interface PageProps {
  searchParams: Promise<{ error: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const sp = await searchParams;
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
              <h1 className="text-2xl font-bold mb-2">Login Error</h1>
              <p className="text-destructive">
                {sp.error === "account_not_linked"
                  ? "This account is already linked to another sign in method. Please try again with a different account."
                  : "Oops! Something went wrong. Please try again."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
