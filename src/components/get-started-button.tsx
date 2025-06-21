"use client";

import { useSession } from "@/lib/auth-client";
import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const GetStartedButton = () => {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <Button size="lg" className="opacity-50" asChild>
        Get Started
      </Button>
    );
  }

  const href = session ? "/profile" : "/auth/login";

  return (
    <div className="flex flex-col items-center gap-4">
      <Button size="lg" asChild className="px-6 py-6 text-base">
        <Link href={href} className="flex items-center gap-2">
          Get Started
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Button>

      {session && <p className="text-muted-foreground">Welcome back, {session.user.name}</p>}
    </div>
  );
};
