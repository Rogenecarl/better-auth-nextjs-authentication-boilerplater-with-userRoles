"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

export default function RegistrationSuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="h-16 w-16 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold">Registration Successful!</CardTitle>
          <CardDescription>Your provider account has been created successfully.</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4">
            We've sent a verification link to your email address. Please verify your email to activate your account.
          </p>
          <p className="text-sm text-muted-foreground">
            Once verified, your registration will be reviewed by our admin team.
            You'll receive a notification when your account is approved.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/auth/login">
            <Button>Go to Login</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
