import { GalleryVerticalEnd } from "lucide-react";
import Link from "next/link";
import { RegisterRoles } from "@/components/register-roles";
import { ReturnButton } from "@/components/return-button";

export default async function RegisterRolesPage() {
  return (
    <div className="flex min-h-svh w-full flex-col items-center justify-center px-4 py-8 md:py-12">
      <div className="w-full max-w-5xl">
        {/* <div className="flex max-w-4xl items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            <span className="hidden sm:inline">Acme Inc.</span>
          </Link>
          <ReturnButton href="/" label="Home" />
        </div> */}
        
        <div className="flex w-full items-center justify-center">
          <div className="w-full max-w-4xl">
            <RegisterRoles />
          </div>
        </div>
      </div>
    </div>
  );
} 