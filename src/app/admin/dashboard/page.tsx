import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import SignOutButton from "@/components/sign-out-button";
import { ReturnButton } from "@/components/return-button";
import { prisma } from "@/lib/prisma";

import {
  DeleteUserButton,
  PlaceholderDeleteUserButton,
} from "@/components/delete-user-button";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/auth/login");

  if (session.user.role !== "ADMIN") {
    redirect("/auth/login");
  }

  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });

  return (
    <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8">
      <div className="space-y-8">
        <ReturnButton href="/" label="Home" />
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Manage your admin dashboard.
        </p>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="table table-auto min-w-full whitespace-nowrap">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b text-sm text-center">
                <td className="text-center px-4 py-2">{user.id}</td>
                <td className="text-center px-4 py-2">{user.name}</td>
                <td className="text-center px-4 py-2">{user.email}</td>
                <td className="text-center px-4 py-2">{user.role}</td>
                <td className="text-center px-4 py-2">
                  {user.createdAt.toLocaleDateString()}
                </td>
                <td className="px-4 py-2 text-center">
                  {user.role === "ADMIN" || user.id === session.user.id ? (
                    <PlaceholderDeleteUserButton />
                  ) : (
                    <DeleteUserButton userId={user.id} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <SignOutButton />
    </div>
  );
}
