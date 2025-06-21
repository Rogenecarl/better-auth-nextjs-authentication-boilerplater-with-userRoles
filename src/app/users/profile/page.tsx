import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import SignOutButton from "@/components/sign-out-button";
import { ReturnButton } from "@/components/return-button";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/auth/login");

  if (session.user.role !== "USER") {
    redirect("/auth/login");
  }

  return (
    <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8">
      <div className="space-y-8">
        <ReturnButton href="/" label="Home" />
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-sm text-muted-foreground">
          Manage your profile information and settings.
        </p>
      </div>

      <SignOutButton />
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
