import { redirect } from "next/navigation"

import { UpdateWorkspaceForm } from "@/features/workspaces/components/update-workspace-form"
import { getCurrent } from "@/features/auth/queries"
import { getWorkspace } from "@/features/workspaces/queries"

type PageProps = {
   params: Promise<{
      workspaceId: string
   }>
}

export default async function Page({ params }: PageProps) {
   const { workspaceId } = await params
   const user = await getCurrent()
   if (!user) redirect("/sign-in")

   const initialValues = await getWorkspace({ workspaceId })

   if (!initialValues) redirect(`/workspaces/${workspaceId}`)

   return (
      <div className="w-full lg:max-w-xl">
         <UpdateWorkspaceForm initialValues={initialValues} />
      </div>
   )
}
