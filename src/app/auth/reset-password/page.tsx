import { redirect } from "next/navigation";
import { ResetPasswordForm } from "@/components/reset-password-form";

interface PageProps {
  searchParams: {
    token: string;
  };
}

export default async function Page({ searchParams }: PageProps) {
  const token = (await searchParams).token;

  if (!token) redirect("/auth/login");

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Reset your password</h1>
      <p className="text-sm text-muted-foreground">
        Please enter your new password.
      </p>
      <ResetPasswordForm token={token} />
    </div>
  );
}
