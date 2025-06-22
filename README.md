# BetterAuth - Next.js Authentication Solution

<div align="center">

![Better Auth Logo](https://placehold.co/600x150?text=Better+Auth)

[![Next.js](https://img.shields.io/badge/Next.js-15.x-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.x-2D3748?style=flat&logo=prisma)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

</div>

A modern authentication solution built with Next.js 15, Prisma, and better-auth. This project provides a secure and customizable authentication system for web applications with form validation using Zod and TanStack React Query.

## 🚀 Features

- 🔐 Secure authentication using better-auth
- 📦 PostgreSQL database integration with Prisma
- 🧩 Form validation with Zod
- 🔄 API state management with TanStack React Query
- 🚀 Built with Next.js 15 and TurboCache for optimal performance
- 🎨 UI components with Tailwind CSS and Shadcn/UI
- 🌙 Dark mode support with next-themes
- 🔔 Toast notifications with Sonner

## 📋 Prerequisites

- Node.js 18.x or higher
- PostgreSQL database
- npm or yarn

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/betterauth.git
cd betterauth
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Set up environment variables

Copy the example.env file to .env:

```bash
cp example.env .env
```

Fill in the required environment variables:

```
BETTER_AUTH_SECRET= Your better auth secret || generate from better auth
BETTER_AUTH_URL=http://localhost:3000

# from server to client
NEXT_PUBLIC_API_URL=http://localhost:3000

# Connect to PostgreSQL via connection pooling
DATABASE_URL=postgresql://username:password@host:port/database
# Direct connection to the database. Used for migrations
DIRECT_URL=postgresql://username:password@host:port/database

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

### 4. Initialize the database

```bash
npx prisma db push
npx prisma generate
```

## 🏃‍♂️ Development

Start the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## 🧰 NPM Dependencies

### External Dependencies Installation

Then install the external dependencies:

```bash
# Authentication and database
npm install better-auth @prisma/client

# Form validation and data fetching
npm install zod @tanstack/react-query

# UI components
npm install sonner next-themes

# Install shadcn components (CLI)
npx shadcn-ui@latest init

# for password hashing
npm install @node-rs/argon2

# for email verification
npm install nodemailer

npm install @types/nodemailer -D
```

## 📊 Database Schema

The application uses the following data models:

- **User**: Core user data (name, email, etc.)
- **Session**: User sessions with expiration
- **Account**: Provider accounts (OAuth, password)
- **Verification**: For email verification
- **Post**: Example model for user content

### Database Diagram

```
┌─────────────┐       ┌───────────┐
│    User     │       │  Session  │
├─────────────┤       ├───────────┤
│ id          │       │ id        │
│ createdAt   │       │ createdAt │
│ updatedAt   │       │ updatedAt │
│ name        │       │ expiresAt │
│ email       │◄──────┤ userId    │
│ emailVerified       │ token     │
│ image       │       │ ipAddress │
└─────────────┘       │ userAgent │
       ▲              └───────────┘
       │
       │              ┌────────────────┐
       │              │   Verification  │
       │              ├────────────────┤
       │              │ id             │
       │              │ createdAt      │
       │              │ updatedAt      │
       │              │ identifier     │
       │              │ value          │
       │              │ expiresAt      │
       │              └────────────────┘
       │
┌──────┴────────┐       ┌───────────┐
│   Account     │       │   Post    │
├───────────────┤       ├───────────┤
│ id            │       │ id        │
│ createdAt     │       │ createdAt │
│ updatedAt     │       │ updatedAt │
│ accountId     │       │ title     │
│ providerId    │       │ content   │
│ accessToken   │◄──────┤ userId    │
│ refreshToken  │       └───────────┘
│ idToken       │
│ password      │
│ userId        │
└───────────────┘
```

## 🔐 Authentication Setup

The project uses better-auth for authentication:

1. Authentication is configured in `src/lib/auth.ts`
2. Client-side authentication hooks are available in `src/lib/auth-client.ts`
3. API routes are set up in `src/app/api/auth/[...all]/route.ts`

### Authentication Flow

1. **Registration**: Users can register with email/password or OAuth providers
2. **Login**: Secure login with email/password or OAuth
3. **Session Management**: Sessions are stored in the database with expiration
4. **Profile Management**: Users can update their profile information

## 📝 Form Validation

Forms are validated using Zod schemas with a custom `useZodForm` hook that:

1. Defines validation rules for form fields
2. Provides real-time validation feedback
3. Integrates with TanStack React Query for API calls
4. Handles error states and displays user-friendly messages

## 🏗️ Project Structure

```
src/
├── app/                   # Next.js App Router
│   ├── api/               # API Routes
│   │   └── auth/          # Auth API Routes
│   │   ├── login/         # Login Page
│   │   └── register/      # Registration Page
│   ├── profile/           # User Profile Page
│   └── layout.tsx         # Root Layout
├── components/            # React Components
│   ├── hooks/             # Custom Hooks
│   ├── providers/         # Context Providers
│   ├── ui/                # UI Components
│   ├── login-form.tsx     # Login Form Component
│   └── register-form.tsx  # Registration Form Component
├── generated/             # Generated Prisma Client
├── lib/                   # Utility Functions
│   ├── auth.ts            # Auth Configuration
│   ├── auth-client.ts     # Client-side Auth Hooks
│   ├── prisma.ts          # Prisma Client
│   └── utils.ts           # Utility Functions
```

## 🔨 Building for Production

Build the application:

```bash
npm run build
# or
yarn build
```

Start the production server:

```bash
npm run start
# or
yarn start
```

## 🌱 Extending the Project

### Adding OAuth Providers

To add OAuth providers like Google, GitHub, etc., modify `src/lib/auth.ts`:

```typescript
export const auth = betterAuth({
  // Existing config...
  
  // Add OAuth providers
  oauth: {
    providers: [
      {
        id: "google",
        name: "Google",
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      },
      // Add more providers as needed
    ],
  },
});
```

### Adding New Pages

Create new pages in the `src/app` directory following Next.js App Router conventions.

## 📄 License

[MIT](LICENSE)

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
