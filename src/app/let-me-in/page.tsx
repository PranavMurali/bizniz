"use server";

import { GalleryVerticalEnd } from "lucide-react"
import { LoginForm } from "@/components/login-form"
import { LogoutButton } from "@/components/ui/auth/auth-buttons";
import { auth } from "@/auth";
import Link from "next/link";

export default async function LoginPage() {
  const session = await auth();
  console.log("session",session)
  if (session) {
    return (
      <div>
        <Link href="/me">User Info</Link>
        <LogoutButton />
      </div>
    )
  }
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Bizniz
        </a>
        <LoginForm />
      </div>
    </div>
  )

}