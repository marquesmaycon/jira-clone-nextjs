import { redirect } from "next/navigation"

import { getCurrent } from "@/features/auth/queries"
import { getWorkspaceInfo } from "@/features/workspaces/queries"
import { JoinWorkspaceForm } from "@/features/workspaces/components/join-workspace-form"

type PageProps = {
   params: Promise<{
      workspaceId: string
      inviteCode: string
   }>
}

export default async function Page({ params }: PageProps) {
   const user = await getCurrent()
   if (!user) redirect("/sign-in")

   const { workspaceId, inviteCode } = await params
   const workspace = await getWorkspaceInfo({ workspaceId })

   if (!workspace) redirect("/")

   return (
      <div className="w-full lg:max-w-xl">
         <JoinWorkspaceForm
            initialValues={workspace}
            inviteCode={inviteCode}
            workspaceId={workspaceId}
         />
      </div>
   )
}
