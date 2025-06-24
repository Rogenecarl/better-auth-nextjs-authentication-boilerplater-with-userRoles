"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { approveUserAction } from "@/actions/admin.actions";
import { CheckCircle } from "lucide-react";

interface ApproveUserButtonProps {
  userId: string;
}

export function ApproveUserButton({ userId }: ApproveUserButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleApprove = async () => {
    try {
      setIsLoading(true);
      toast.loading("Approving user...", { id: "approve-user" });

      const result = await approveUserAction(userId);

      if (result.error) {
        throw new Error(result.error);
      }

      toast.success("User approved successfully", { id: "approve-user" });

      // Refresh the page to show updated status
      window.location.reload();
    } catch (error: any) {
      toast.error(error.message || "Failed to approve user", {
        id: "approve-user",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleApprove}
      disabled={isLoading}
      variant="outline"
      size="sm"
      className="flex items-center gap-1 text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700"
    >
      <CheckCircle className="h-4 w-4" />
      <span>Approve</span>
    </Button>
  );
}
