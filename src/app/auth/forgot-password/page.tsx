import { ForgotPasswordForm } from "@/components/forgot-password-form";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Forgot your password?</h1>
      <p className="text-sm text-muted-foreground">
        Please enter your email to reset your password.
      </p>
      <ForgotPasswordForm />
    </div>
  );
}
