import React from "react"
import Link from "next/link"
import Image from "next/image"

import { DottedSeparator } from "./dotted-separator"
import { Navigation } from "./navigation"
import { WorkspaceSwitcher } from "./workspace-switcher"

export const Sidebar = () => {
   return (
      <aside className="h-full w-full bg-neutral-100 p-4">
         <Link href="/">
            <Image src="/logo.svg" alt="Logo" width={233} height={40} />
         </Link>
         <DottedSeparator className="my-4" />
         <WorkspaceSwitcher />
         <DottedSeparator className="my-4" />
         <Navigation />
      </aside>
   )
}
