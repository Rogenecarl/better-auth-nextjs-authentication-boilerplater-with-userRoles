"use client";

import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { deleteUserAction } from "@/actions/delete-user.action";
import { toast } from "sonner";

interface DeleteUserButtonProps {
  userId: string;
}

export const DeleteUserButton = ({ userId }: DeleteUserButtonProps) => {
  const [isPending, setIsPending] = useState(false);

  async function handleDelete() {
    setIsPending(true);

    const { error } = await deleteUserAction(userId);

    if (error) {
      toast.error(error);
    } else {
      toast.success("User deleted successfully");
    }

    setIsPending(false);
  }

  return (
    <Button
      size="icon"
      variant="destructive"
      className="size-7 rounded-sm"
      disabled={isPending}
      onClick={handleDelete}
    >
      <span className="sr-only">Delete User</span>
      <Trash2 className="w-4 h-4" />
    </Button>
  );
};

export const PlaceholderDeleteUserButton = () => {
  return (
    <Button
      size="icon"
      variant="destructive"
      className="size-7 rounded-sm"
      disabled
    >
      <span className="sr-only">Delete User</span>
      <Trash2 className="w-4 h-4" />
    </Button>
  );
};
