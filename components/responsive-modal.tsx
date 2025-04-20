import { useMedia } from "react-use"

import { cn } from "@/lib/utils"

import { Dialog, DialogContent } from "./ui/dialog"
import { Drawer, DrawerContent } from "./ui/drawer"

type ResponsiveModalProps = React.PropsWithChildren<{
   open: boolean
   onOpenChange: (open: boolean) => void
}>

export const ResponsiveModal = ({
   open,
   onOpenChange,
   children
}: ResponsiveModalProps) => {
   const isDesktop = useMedia("(min-width: 1024px)", true)

   const Root = isDesktop ? Dialog : Drawer
   const Content = isDesktop ? DialogContent : DrawerContent

   return (
      <Root open={open} onOpenChange={onOpenChange}>
         <Content
            className={cn(
               "hide-scrollbar max-h-[85vh] overflow-y-auto",
               isDesktop && "w-full border-none p-0 sm:max-w-lg"
            )}
         >
            {children}
         </Content>
      </Root>
   )
}
