"use client"

import { ResponsiveModal } from "@/components/responsive-modal"

import { CreateWorkspaceForm } from "./create-workspace-form"
import { useCreateWorkspaceModal } from "../hooks/use-create-workspace-modal"

export const CreateWorkspaceModal = () => {
   const { isOpen, setisOpen, close } = useCreateWorkspaceModal()

   return (
      <ResponsiveModal open={isOpen} onOpenChange={setisOpen}>
         <CreateWorkspaceForm onCancel={close} />
      </ResponsiveModal>
   )
}
