import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

// Map of roles to their respective dashboards
const roleDashboards = {
  ADMIN: "/admin/dashboard",
  HEALTH_PROVIDER: "/healthproviders/dashboard",
  USER: "/profile",
};

export async function GET(req: NextRequest) {
  try {
    // Get the session from the request headers
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session) {
      // If no session, redirect to login
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    // Get the user's role from the session
    const role = session.user.role;

    // Determine the dashboard URL based on the role
    const dashboardUrl =
      roleDashboards[role as keyof typeof roleDashboards] || "/profile";

    // Redirect to the appropriate dashboard
    return NextResponse.redirect(new URL(dashboardUrl, req.url));
  } catch (error) {
    console.error("Error in redirect route:", error);
    // If there's an error, redirect to the login page
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
}
