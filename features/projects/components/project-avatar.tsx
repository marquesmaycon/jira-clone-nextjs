import React from "react"
import Image from "next/image"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

type ProjectAvatarProps = {
   name: string
   image?: string
   className?: string
   fallbackClassName?: string
}

export const ProjectAvatar = ({
   name,
   image,
   className,
   fallbackClassName
}: ProjectAvatarProps) => {
   if (image) {
      return (
         <div
            className={cn(
               "relative size-6 overflow-hidden rounded-md",
               className
            )}
         >
            <Image src={image} alt={name} fill className="object-cover" />
         </div>
      )
   }
   return (
      <Avatar className={cn("size-6 rounded-md", className)}>
         <AvatarFallback
            className={cn(
               "rounded-md bg-blue-600 text-sm font-semibold text-white uppercase",
               fallbackClassName
            )}
         >
            {name[0]}
         </AvatarFallback>
      </Avatar>
   )
}
