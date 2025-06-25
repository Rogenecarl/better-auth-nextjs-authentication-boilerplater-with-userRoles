import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function userDashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/auth/login");

  if (session.user.role !== "USER") {
    if (session.user.role === "ADMIN") {
      redirect("/admin/dashboard");
    } else {
      redirect("/healthproviders/dashboard");
    }
  }

  return <div>User Dashboard</div>;
}
