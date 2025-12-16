import { redirect } from "next/navigation"

import { getCurrent } from "@/features/auth/queries"
import { UpdateWorkspaceForm } from "@/features/workspaces/components/update-workspace-form"
import { getWorkspace } from "@/features/workspaces/queries"

type PageProps = {
   params: Promise<{
      workspaceId: string
   }>
}

export default async function Page({ params }: PageProps) {
   const user = await getCurrent()
   if (!user) redirect("/sign-in")

   const { workspaceId } = await params
   const initialValues = await getWorkspace({ workspaceId })

   return (
      <div className="w-full lg:max-w-xl">
         <UpdateWorkspaceForm initialValues={initialValues} />
      </div>
   )
}
