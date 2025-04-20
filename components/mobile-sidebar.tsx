"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { MenuIcon } from "lucide-react"

import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { Button } from "./ui/button"
import { Sidebar } from "./sidebar"

export const MobileSidebar = () => {
   const pathname = usePathname()
   const [open, setOpen] = useState(false)

   useEffect(() => {
      setOpen(false)
   }, [pathname])

   return (
      <Sheet modal={false} open={open} onOpenChange={setOpen}>
         <SheetTrigger asChild>
            <Button variant="secondary" className="lg:hidden">
               <MenuIcon className="text-neutral-500 size-5" />
            </Button>
         </SheetTrigger>
         <SheetContent side="left" className="p-0">
            <Sidebar />
         </SheetContent>
      </Sheet>
   )
}
