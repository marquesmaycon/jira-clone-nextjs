"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

import { useCurrent } from "@/features/auth/api/use-current"
import { useLogout } from "@/features/auth/api/use-logout"
import { Button } from "@/components/ui/button"

export default function Home() {
   const router = useRouter()
   const { data, isLoading } = useCurrent()
   const { mutate: logout } = useLogout()

   useEffect(() => {
      if (!data && !isLoading) {
         router.push("/sign-in")
      }
   }, [data, isLoading, router])

   return (
      <div className="space-x-4 space-y-4">
         Private Route
         <Button variant="destructive" onClick={() => logout()}>
            Logout
         </Button>
      </div>
   )
}
