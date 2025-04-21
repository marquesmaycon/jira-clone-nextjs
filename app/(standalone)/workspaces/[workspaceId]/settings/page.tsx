import { redirect } from "next/navigation"

import { getCurrent } from "@/features/auth/actions"
import { UpdateWorkspaceForm } from "@/features/workspaces/components/update-workspace-form"
import { getWorkspace } from "@/features/workspaces/actions"
import React from "react"

type PageProps = {
   params: {
      workspaceId: string
   }
}

export default async function Page({ params }: PageProps) {
   const user = await getCurrent()
   if (!user) redirect("/sign-in")

   const initialValues = await getWorkspace({ workspaceId: params.workspaceId })

   if (!initialValues) redirect(`/workspaces/${params.workspaceId}`)

   return (
      <div className="w-full lg:max-w-xl">
         <UpdateWorkspaceForm initialValues={initialValues} />
      </div>
   )
}
