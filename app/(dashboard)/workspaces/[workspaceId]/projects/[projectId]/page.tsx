import Link from "next/link"
import { redirect } from "next/navigation"
import { PencilIcon } from "lucide-react"

import { getCurrent } from "@/features/auth/queries"
import { getProject } from "@/features/projects/queries"
import { ProjectAvatar } from "@/features/projects/components/project-avatar"
import { Button } from "@/components/ui/button"

export default async function Page({
   params
}: {
   params: Promise<{ workspaceId: string; projectId: string }>
}) {
   const user = await getCurrent() // TO DO => 401 page com middleware
   if (!user) redirect("/sign-in")

   const { projectId } = await params

   const project = await getProject({ projectId })

   if (!project) {
      throw new Error("Project not found") // TO DO => 404 page
   }

   return (
      <div className="flex flex-col gap-y-4">
         <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-2">
               <ProjectAvatar
                  name={project.name}
                  image={project.imageUrl}
                  className="size-8"
               />
               <p className="text-lg font-semibold">{project.name}</p>
            </div>
            <div>
               <Button variant="secondary" size="sm" asChild>
                  <Link
                     href={`/workspaces/${project.workspaceId}/projects/${project.$id}/settings`}
                  >
                     <PencilIcon className="mr-2 size-4" />
                     <span>Edit Project</span>
                  </Link>
               </Button>
            </div>
         </div>
      </div>
   )
}
