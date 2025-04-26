import { Loader } from "lucide-react"
import React from "react"

export const Loading = () => {
   return (
      <Loader className="text-muted-foreground absolute top-[50%] left-[50%] size-8 -translate-x-1/2 -translate-y-1/2 transform animate-spin" />
   )
}
