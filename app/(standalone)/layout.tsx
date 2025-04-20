import Image from "next/image"
import Link from "next/link"

import { UserButton } from "@/features/auth/components/user-button"

export default function Layout({ children }: React.PropsWithChildren) {
   return (
      <main className="min-h-screen bg-neutral-100">
         <div className="mx-auto max-w-screen-2xl p-4">
            <nav className="flex h-[73px] items-center justify-between">
               <Link href="/" className="text-2xl font-bold text-neutral-800">
                  <Image src="/logo.svg" alt="Logo" width={233} height={40} />
               </Link>
               <UserButton />
            </nav>
            <div className="flex flex-col items-center justify-center py-4">
               {children}
            </div>
         </div>
      </main>
   )
}
