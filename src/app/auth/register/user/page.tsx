
import { RegisterForm } from "@/components/register-form";
import Link from "next/link";
import { SignInOuthButton } from "@/components/sign-in-outh-button";

export default function RegisterUserPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
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
