"use client"

import { AlertTriangleIcon } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"

export const Error = () => {
   return (
      <div className="flex h-screen flex-col items-center justify-center gap-y-4">
         <AlertTriangleIcon className="size-8" />
         <p className="text-sm">Something went wrong</p>
         <Button variant="secondary" size="sm" asChild>
            <Link href="/">Back to Home</Link>
         </Button>
      </div>
   )
}
