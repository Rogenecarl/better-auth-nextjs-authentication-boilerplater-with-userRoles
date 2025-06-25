import { GetStartedButton } from "@/components/get-started-button";
import Link from "next/link";
import { ArrowRight, CheckCircle, Shield, UserCheck } from "lucide-react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user?.role === "ADMIN") redirect("/admin/dashboard");
  if (session?.user?.role === "HEALTH_PROVIDER") redirect("/healthproviders/dashboard");

  return (
    <div className="min-h-dvh flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-4 py-24 md:py-32 text-center bg-gradient-to-b from-background to-secondary/20">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Secure Authentication Solution
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Modern Authentication for Your{" "}
            <span className="text-primary">Next.js Applications</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            A secure, customizable authentication system with form validation,
            user roles, and modern UI components.
          </p>
          <div className="pt-4">
            <GetStartedButton />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-card rounded-xl p-6 border shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Secure Authentication
              </h3>
              <p className="text-muted-foreground">
                Complete authentication flow with email verification and
                password reset functionality.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-card rounded-xl p-6 border shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <UserCheck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                User Role Management
              </h3>
              <p className="text-muted-foreground">
                Built-in role-based access control for users, health providers,
                and administrators.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-card rounded-xl p-6 border shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Form Validation</h3>
              <p className="text-muted-foreground">
                Robust form validation with Zod and seamless API integration
                with TanStack Query.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-secondary/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Implement secure authentication in your Next.js application today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <GetStartedButton />
            <Link
              href="https://github.com/Rogenecarl/better-auth-nextjs-authentication-boilerplater-with-userRoles"
              className="inline-flex items-center justify-center gap-2 h-10 px-6 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
            >
              View on GitHub
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
