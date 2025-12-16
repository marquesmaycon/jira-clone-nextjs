"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { RiAddCircleFill } from "react-icons/ri"

import { useProjects } from "@/features/projects/api/use-projects"
import { ProjectAvatar } from "@/features/projects/components/project-avatar"
import { useCreateProjectModal } from "@/features/projects/hooks/use-create-project-modal"
import { useWorkspaceId } from "@/features/workspaces/hooks/user-workspace-id"
import { cn } from "@/lib/utils"

export const Projects = () => {
   const pathname = usePathname()
   const workspaceId = useWorkspaceId()
   const { open } = useCreateProjectModal()
   const { data: projects } = useProjects({ workspaceId })
   return (
      <div className="flex flex-col gap-y-2">
         <div className="flex items-center justify-between">
            <p className="text-xs text-neutral-500 uppercase">Projects</p>
            <RiAddCircleFill
               className="size-5 cursor-pointer text-neutral-500 transition hover:opacity-75"
               onClick={open}
            />
         </div>
         {projects?.documents.map((project) => {
            const href = `/workspaces/${workspaceId}/projects/${project.$id}`
            const isActive = pathname === href
            return (
               <Link href={href} key={project.$id}>
                  <div
                     className={cn(
                        "flex cursor-pointer items-center gap-2.5 rounded-md p-2.5 text-neutral-500 transition hover:opacity-75",
                        isActive &&
                           "text-sidebar-primary bg-white opacity-100 shadow-sm"
                     )}
                  >
                     <ProjectAvatar
                        name={project.name}
                        image={project.imageUrl}
                     />
                     <span className="truncate">{project.name}</span>
                  </div>
               </Link>
            )
         })}
      </div>
   )
}
