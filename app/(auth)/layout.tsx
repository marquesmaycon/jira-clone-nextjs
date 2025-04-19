"use client"

import Image from "next/image"
import Link from "next/link"

import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
   const pathname = usePathname()
   const isSignInPage = pathname === "/sign-in"
   return (
      <main className="bg-neutral-100 min-h-screen">
         <div className="mx-auto max-w-screen-2xl p-4">
            <nav className="flex justify-between items-center">
               <Image src="/logo.svg" width={152} height={56} alt="Logo" />
               <Button asChild variant="secondary">
                  <Link href={isSignInPage ? "/sign-up" : "/sign-in"}>{isSignInPage ? "Sign Up" : "Sign In"}</Link>
               </Button>
            </nav>
            <div className="flex flex-col items-center justify-center pt-4 md:pt-14">{children}</div>
         </div>
      </main>
   )
}
