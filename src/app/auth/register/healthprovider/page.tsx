import { GalleryVerticalEnd } from "lucide-react";
import Link from "next/link";
import { ReturnButton } from "@/components/return-button";
import { RegisterProviderForm } from "@/components/register-provider-form";

export default function RegisterHealthProviderPage() {
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
            <div className="mb-8 text-center">
              <h1 className="text-2xl font-bold mb-2">
                Healthcare Provider Registration
              </h1>
              <p className="text-muted-foreground text-sm">
                Register as a certified healthcare professional
              </p>
            </div>

            <div className="space-y-6">
              {/* Provider registration form will be implemented here */}
              <div className="border rounded-lg p-6 bg-muted/30">
                <div className="text-center space-y-4">
                  <h2 className="text-lg font-medium">Provider Registration</h2>
                  <p className="text-sm text-muted-foreground">
                    The healthcare provider registration form will be
                    implemented here. It will include additional fields for
                    professional credentials and verification.
                  </p>
                  <RegisterProviderForm />
                </div>
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
