import { ReturnButton } from "@/components/return-button";
import SignOutButton from "@/components/sign-out-button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function HealthProvidersDashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/auth/login");

  if (session.user.role !== "HEALTH_PROVIDER") {
    redirect("/api/auth/redirect");
  }

  return (
    <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8">
      <div className="space-y-8">
        <ReturnButton href="/" label="Home" />
        <h1 className="text-2xl font-bold">Health Providers Dashboard</h1>
        <SignOutButton />
      </div>
    </div>
  );
}
