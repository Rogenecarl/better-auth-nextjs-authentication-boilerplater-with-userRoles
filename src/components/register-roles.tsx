import Link from "next/link";
import { ArrowRight, User, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const RegisterRoles = () => {
  return (
    <div className="flex w-full flex-col items-center gap-8 py-6 md:py-10">
      <div className="text-center space-y-3 max-w-md mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Create an Account</h1>
        <p className="text-muted-foreground text-sm md:text-base">
          Choose how you want to register with our platform
        </p>
      </div>
      
      <div className="grid w-full gap-4 sm:gap-6 px-4 md:px-0 max-w-3xl sm:grid-cols-1 md:grid-cols-2">
        <Card className="hover:shadow-md transition-all duration-300 border-primary/10 hover:border-primary/30">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
              <div className="bg-primary/10 rounded-full p-1.5">
                <User className="h-5 w-5 text-primary" />
              </div>
              Regular User
            </CardTitle>
            <CardDescription className="text-sm mt-2">
              Create a standard account for personal use and access our services
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-col space-y-4">
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  Access to all basic features
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  Personalized dashboard
                </li>
              </ul>
              <Button asChild className="w-full mt-2">
                <Link href="/auth/register/user" className="flex items-center justify-center gap-2">
                  Create new account
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-all duration-300 border-primary/10 hover:border-primary/30">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
              <div className="bg-primary/10 rounded-full p-1.5">
                <UserRound className="h-5 w-5 text-primary" />
              </div>
              Health Care Provider
            </CardTitle>
            <CardDescription className="text-sm mt-2">
              Register as a certified health care professional with additional privileges
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-col space-y-4">
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  All regular user features
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  Professional verification
                </li>
              </ul>
              <Button asChild variant="outline" className="w-full mt-2">
                <Link href="/auth/register/healthprovider" className="flex items-center justify-center gap-2">
                  Register as provider
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
