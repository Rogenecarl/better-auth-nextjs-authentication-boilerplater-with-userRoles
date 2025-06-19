"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { signOut } from "@/lib/auth-client";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
export default function SignOutButton() {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async () => {
      await signOut();
    },
    onSuccess: () => {
      toast.success("Signed out successfully");
      router.push("/auth/login");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to sign out");
    },
  });

  return (
    <Button
      onClick={() => {
        mutation.mutate();
      }}
      size={"sm"}
      variant={"destructive"}
      disabled={mutation.isPending}
    >
      {mutation.isPending ? "Signing out..." : "Sign Out"}
    </Button>
  );
}
