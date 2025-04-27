import { getCurrent } from "@/features/auth/queries"
import { UpdateProjectForm } from "@/features/projects/components/update-project-form"
import { getProject } from "@/features/projects/queries"
import { redirect } from "next/navigation"

export default async function Page({
   params
}: {
   params: Promise<{ workspaceId: string; projectId: string }>
}) {
   const user = await getCurrent()
   if (!user) redirect("/sign-in")

   const { projectId } = await params
   const project = await getProject({ projectId })

   return (
      <div className="w-full lg:max-w-xl">
         <UpdateProjectForm project={project} />
      </div>
   )
}
