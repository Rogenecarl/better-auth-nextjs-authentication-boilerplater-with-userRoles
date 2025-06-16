# BetterAuth - Next.js Authentication Solution

A modern authentication solution built with Next.js 15, Prisma, and better-auth. This project provides a secure and customizable authentication system for web applications.

## Features

- 🔐 Secure authentication using better-auth
- 📦 PostgreSQL database integration with Prisma
- 🚀 Built with Next.js 15 and TurboCache for optimal performance
- 🎨 UI components with Tailwind CSS
- 🌙 Dark mode support with next-themes

## Prerequisites

- Node.js 18.x or higher
- PostgreSQL database
- npm or yarn

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/betterauth.git
cd betterauth
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:
   
   Copy the example.env file to .env:

```bash
cp example.env .env
```

4. Fill in the required environment variables:

```
BETTER_AUTH_SECRET=your_secure_auth_secret
BETTER_AUTH_URL=http://localhost:3000/api/auth

# to access frontend from the server
NEXT_PUBLIC_API_URL=http://localhost:3000

DATABASE_URL=postgresql://username:password@localhost:5432/betterauth
```

5. Initialize the database:

```bash
npx prisma db push
# or
yarn prisma db push
```

## Development

Start the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Database Schema

The application uses the following data models:

- **User**: Core user data (name, email, etc.)
- **Session**: User sessions with expiration
- **Account**: Provider accounts (OAuth, password)
- **Verification**: For email verification
- **Post**: Example model for user content

## Authentication Setup

The project uses better-auth for authentication:

1. Authentication is configured in `src/lib/auth.ts`
2. Client-side authentication hooks are available in `src/lib/auth-client.ts`
3. API routes are set up in `src/app/api/auth/[...all]/route.ts`

## Building for Production

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

## License

[MIT](LICENSE)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
