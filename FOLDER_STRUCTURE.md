# Project Folder Structure

```
├── Better-Auth/                          # Root directory
│   ├── components.json                   # UI component configuration
│   ├── eslint.config.mjs                 # ESLint configuration
│   ├── example.env                       # Example environment variables
│   ├── next.config.ts                    # Next.js configuration
│   ├── package-lock.json                 # npm lock file
│   ├── package.json                      # Project dependencies
│   ├── postcss.config.mjs                # PostCSS configuration
│   ├── prisma/                           # Database schema and migrations
│   │   └── schema.prisma                 # Prisma schema definition
│   ├── public/                           # Static assets
│   ├── README.md                         # Project documentation
│   ├── src/                              # Source code
│   │   ├── actions/                      # Server actions
│   │   │   ├── admin.actions.ts          # Admin-related server actions
│   │   │   ├── reset-passowrd.action.ts  # Password reset functionality
│   │   │   ├── send-email.action.ts      # Email sending functionality
│   │   │   ├── sign-in-email.action.ts   # Email sign-in functionality
│   │   │   ├── sign-up-email.action.ts   # Email sign-up functionality
│   │   │   └── sign-up-provider.action.ts # Provider sign-up functionality
│   │   │
│   │   ├── app/                          # ROUTING & UI (All routes and pages live here)
│   │   │   ├── (users)/                  # --- USER ROUTES ---
│   │   │   │   ├── dashboard/            # User dashboard route
│   │   │   │   │   └── page.tsx
│   │   │   │   └── profile/              # User profile route
│   │   │   │       └── page.tsx
│   │   │   │
│   │   │   ├── admin/                    # --- ADMIN ROUTES ---
│   │   │   │   ├── dashboard/            # Admin dashboard route
│   │   │   │   │   └── page.tsx
│   │   │   │   └── profile/              # Admin profile route
│   │   │   │
│   │   │   ├── api/                      # --- API ROUTES ---
│   │   │   │   └── auth/                 # Authentication API routes
│   │   │   │       └── [...all]/         # Auth.js catch-all route
│   │   │   │           └── route.ts
│   │   │   │
│   │   │   ├── auth/                     # --- AUTHENTICATION FLOW ---
│   │   │   │   ├── forgot-password/      # Forgot password route
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── success/          # Success page after password reset request
│   │   │   │   │       └── page.tsx
│   │   │   │   │
│   │   │   │   ├── login/                # Login route
│   │   │   │   │   ├── error/            # Login error route
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   └── page.tsx
│   │   │   │   │
│   │   │   │   ├── register/             # Main registration flow
│   │   │   │   │   ├── healthprovider/   # Health provider registration
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── user/             # Normal user registration
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── success/          # Registration success
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   └── page.tsx          # Registration landing page
│   │   │   │   │
│   │   │   │   ├── reset-password/       # Password reset routes
│   │   │   │   │   ├── layout.tsx
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── reset-password-client.tsx
│   │   │   │   │
│   │   │   │   └── verify/               # Email verification routes
│   │   │   │       ├── page.tsx
│   │   │   │       └── success/
│   │   │   │           └── page.tsx
│   │   │   │
│   │   │   ├── favicon.ico               # Site favicon
│   │   │   ├── globals.css               # Global CSS
│   │   │   │
│   │   │   ├── healthproviders/          # --- HEALTH PROVIDER ROUTES ---
│   │   │   │   ├── dashboard/            # Provider dashboard
│   │   │   │   │   └── page.tsx
│   │   │   │   └── profile/              # Provider profile
│   │   │   │
│   │   │   ├── layout.tsx                # Root layout
│   │   │   └── page.tsx                  # Home page
│   │   │
│   │   ├── components/                   # Reusable UI components
│   │   │   ├── admin/                    # Admin-specific components
│   │   │   │   └── admin-dashboard.tsx
│   │   │   │
│   │   │   ├── approve-user-button.tsx   # User approval button
│   │   │   ├── delete-user-button.tsx    # User deletion button
│   │   │   ├── forgot-password-form.tsx  # Password reset form
│   │   │   ├── get-started-button.tsx    # Get started CTA button
│   │   │   │
│   │   │   ├── hooks/                    # Custom React hooks
│   │   │   │   └── use-zod-form.ts       # Form validation hook
│   │   │   │
│   │   │   ├── login-form.tsx            # Login form
│   │   │   │
│   │   │   ├── providers/                # React providers
│   │   │   │   └── tanstack-provider.tsx # TanStack Query provider
│   │   │   │
│   │   │   ├── register-form.tsx         # Registration form
│   │   │   ├── register-provider-form.tsx # Provider registration form
│   │   │   ├── register-roles.tsx        # Role selection component
│   │   │   ├── reset-password-form.tsx   # Password reset form
│   │   │   ├── return-button.tsx         # Navigation return button
│   │   │   │
│   │   │   ├── schemas/                  # Validation schemas
│   │   │   │   ├── login-schema.ts       # Login form schema
│   │   │   │   └── register-schema.ts    # Registration form schema
│   │   │   │
│   │   │   ├── send-email-verification-form.tsx # Email verification form
│   │   │   ├── sign-in-outh-button.tsx  # OAuth sign-in button
│   │   │   ├── sign-out-button.tsx      # Sign-out button
│   │   │   │
│   │   │   └── ui/                      # Base UI components
│   │   │       ├── button.tsx           # Button component
│   │   │       ├── card.tsx             # Card component
│   │   │       ├── dialog.tsx           # Dialog/modal component
│   │   │       ├── input.tsx            # Input component
│   │   │       ├── label.tsx            # Label component
│   │   │       └── sonner.tsx           # Toast notification component
│   │   │
│   │   ├── generated/                   # Generated files
│   │   │
│   │   ├── lib/                         # Utility libraries
│   │   │   ├── argon2.ts                # Password hashing
│   │   │   ├── auth-client.ts           # Auth client utilities
│   │   │   ├── auth.ts                  # Authentication configuration
│   │   │   ├── nodemailer.ts            # Email service
│   │   │   ├── prisma.ts                # Database client
│   │   │   └── utils.ts                 # General utilities
│   │   │
│   │   └── middleware.ts                # Next.js middleware
│   │
│   └── tsconfig.json                    # TypeScript configuration
``` 