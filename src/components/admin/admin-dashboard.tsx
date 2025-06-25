"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ReturnButton } from "@/components/return-button";
import SignOutButton from "@/components/sign-out-button";
import { Button } from "@/components/ui/button";
import { CheckCircle, Trash2 } from "lucide-react";
import {
  fetchUsersAction,
  approveUserAction,
  deleteUserAction,
  type UserData,
} from "@/actions/admin.actions";

export function AdminDashboard() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});
  const router = useRouter();

  // Fetch users on component mount
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const result = await fetchUsersAction();

        if (result.error) {
          toast.error(result.error);
          // If unauthorized, redirect to login
          if (result.error.includes("Unauthorized")) {
            router.push("/auth/login");
          }
          return;
        }

        if (result.data) {
          setUsers(result.data);
          setCurrentUserId(result.currentUserId || "");
        }
      } catch {
        toast.error("Failed to load users");
      }
    };

    loadUsers();
  }, [router]);

  const handleApproveUser = async (userId: string) => {
    try {
      setIsLoading((prev) => ({ ...prev, [userId]: true }));
      toast.loading("Approving user...", { id: `approve-${userId}` });

      const result = await approveUserAction(userId);

      if (result.error) {
        throw new Error(result.error);
      }

      toast.success("User approved successfully", { id: `approve-${userId}` });

      // Update the local state
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, isApproved: true } : user
        )
      );

      // Refresh server data
      router.refresh();
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Failed to approve user", {
        id: `approve-${userId}`,
      });
    } finally {
      setIsLoading((prev) => ({ ...prev, [userId]: false }));
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      setIsLoading((prev) => ({ ...prev, [userId]: true }));
      toast.loading("Deleting user...", { id: `delete-${userId}` });

      const result = await deleteUserAction(userId);

      if (result.error) {
        throw new Error(result.error);
      }

      toast.success("User deleted successfully", { id: `delete-${userId}` });

      // Update the local state
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));

      // Refresh server data
      router.refresh();
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Failed to delete user", {
        id: `delete-${userId}`,
      });
    } finally {
      setIsLoading((prev) => ({ ...prev, [userId]: false }));
    }
  };

  return (
    <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8">
      <div className="space-y-8">
        <ReturnButton href="/" label="Home" />
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Manage users and approve healthcare providers.
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
              <th>License</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="text-center py-8 text-muted-foreground"
                >
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="border-b text-sm text-center">
                  <td className="text-center px-4 py-2">{user.id}</td>
                  <td className="text-center px-4 py-2">{user.name}</td>
                  <td className="text-center px-4 py-2">{user.email}</td>
                  <td className="text-center px-4 py-2">{user.role}</td>
                  <td className="text-center px-4 py-2">
                    {user.licenseNumber || "-"}
                  </td>
                  <td className="text-center px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        user.isApproved
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {user.isApproved ? "Approved" : "Pending"}
                    </span>
                  </td>
                  <td className="text-center px-4 py-2">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 text-center flex items-center justify-center gap-2">
                    {user.role === "HEALTH_PROVIDER" && !user.isApproved && (
                      <Button
                        onClick={() => handleApproveUser(user.id)}
                        disabled={isLoading[user.id]}
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1 text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700"
                      >
                        <CheckCircle className="h-4 w-4" />
                        <span>Approve</span>
                      </Button>
                    )}
                    {user.role !== "ADMIN" && user.id !== currentUserId && (
                      <Button
                        onClick={() => handleDeleteUser(user.id)}
                        disabled={isLoading[user.id]}
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span>Delete</span>
                      </Button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <SignOutButton />
    </div>
  );
}
