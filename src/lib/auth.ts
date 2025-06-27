import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";

import { prisma } from "@/lib/prisma";
import { hashPassword, verifyPassword } from "./argon2";
import { createAuthMiddleware, APIError } from "better-auth/api";
import { getValidDomains, normalizeName } from "./utils";
import { sendEmailAction } from "@/actions/send-email.action";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  socialProviders: {
    google: {
      clientId: String(process.env.GOOGLE_CLIENT_ID),
      clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    minPasswordLength: 8,
    maxPasswordLength: 100,
    password: {
      hash: hashPassword,
      verify: verifyPassword,
    },
    requireEmailVerification: true,
    resetPasswordTokenExpiresIn: 10 * 60, // 10 minutes
    sendResetPassword: async ({ user, url }) => {
      await sendEmailAction({
        to: user.email,
        subject: "Reset your password",
        meta: {
          description: "Click the button below to reset your password.",
          link: url,
        },
      });
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    expiresIn: 10 * 60, // 10 minutes
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      const link = new URL(url);
      link.searchParams.set("callbackURL", "/auth/verify");

      await sendEmailAction({
        to: user.email,
        subject: "Verify your email address",
        meta: {
          description: "Click the button below to verify your email address.",
          link: String(link),
        },
      });
    },
  },
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path === "/sign-up/email") {
        const email = String(ctx.body.email);
        const domain = email.split("@")[1];

        const VALID_DOMAINS = getValidDomains();
        if (!VALID_DOMAINS.includes(domain)) {
          throw new APIError("BAD_REQUEST", {
            message: "Invalid domain. Please use a valid email address.",
          });
        }

        const name = normalizeName(ctx.body.name);

        return {
          context: {
            ...ctx,
            body: {
              ...ctx.body,
              name,
            },
          },
        };
      }

      // Check if user is approved when signing in
      if (ctx.path === "/sign-in/email") {
        const email = String(ctx.body.email);

        // Find the user by email
        const user = await prisma.user.findUnique({
          where: { email },
          select: { status: true },
        });

        // If user exists and is not approved, throw an error
        if (user && user.status !== "ACTIVE") {
          throw new APIError("UNAUTHORIZED", {
            message: "Your account is pending approval by an administrator.",
            code: "ACCOUNT_PENDING_APPROVAL",
          });
        }
      }
    }),
  },
  user: {
    additionalFields: {
      role: {
        type: ["USER", "HEALTH_PROVIDER", "ADMIN"],
      },
      status: {
        type: ["ACTIVE", "INACTIVE", "SUSPENDED", "PENDING_VERIFICATION", "PENDING_APPROVAL"],
      },
    },
  },
  session: {
    expiresIn: 30 * 24 * 60 * 60, // 30 days
    cookieCache: {
      enabled: true,
      expiresIn: 20 * 60, // 20 minutes
    },
  },
  account: {
    accountLinking: {
      enabled: false,
    },
  },
  advanced: {
    database: {
      generateId: false,
    },
  },
  plugins: [nextCookies()],
});

export type ErrorCode =
  | keyof typeof auth.$ERROR_CODES
  | "UNKNOWN"
  | "ACCOUNT_PENDING_APPROVAL";
