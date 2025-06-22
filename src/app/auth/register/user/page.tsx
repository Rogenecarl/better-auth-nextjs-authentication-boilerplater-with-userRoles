import { GalleryVerticalEnd } from "lucide-react";
import { RegisterForm } from "@/components/register-form";
import Link from "next/link";
import { ReturnButton } from "@/components/return-button";
import { SignInOuthButton } from "@/components/sign-in-outh-button";

export default function RegisterUserPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-between items-center w-full">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            <span className="hidden sm:inline">Acme Inc.</span>
          </Link>
          <ReturnButton href="/auth/register" label="Back" />
        </div>
        <div className="flex flex-1 items-center justify-center py-6">
          <div className="w-full max-w-md">
            <RegisterForm />
            <div className="pt-4">
              <SignInOuthButton provider="google" signUp />
              <div className="pt-4 text-center text-sm">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="underline underline-offset-4"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/test.svg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
