import { useRouter } from "next/navigation"



import type { Project } from "@/features/projects/types"
import clsx from "clsx"
 



import { MemberAvatar } from "@/features/members/components/member-avatar"
import { ProjectAvatar } from "@/features/projects/components/project-avatar"
import { useWorkspaceId } from "@/features/workspaces/hooks/user-workspace-id"

import { TaskStatus } from "../types"

const statusColorMap: Record<TaskStatus, string> = {
  [TaskStatus.BACKLOG]: "border-l-pink-500",
  [TaskStatus.TODO]: "border-l-red-500",
  [TaskStatus.IN_PROGRESS]: "border-l-yellow-500",
  [TaskStatus.IN_REVIEW]: "border-l-blue-500",
  [TaskStatus.DONE]: "border-l-green-500"
}

type EventCardProps = {
  title: string
  assignee: any
  project: Project
  status: TaskStatus
  id: string
}

export default function EventCard({
  id,
  title,
  status,
  assignee,
  project
}: EventCardProps) {
  const workspaceId = useWorkspaceId()
  const router = useRouter()

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    router.push(`/workspace/${workspaceId}/tasks/${id}`)
  }

  return (
    <div className="px-2" onClick={handleClick}>
      <div
        className={clsx(
          "text-primary flex cursor-pointer flex-col gap-y-1.5 rounded-md border border-l-4 bg-white p-1.5 text-sm transition hover:opacity-75",
          statusColorMap[status]
        )}
      >
        <p>{title}</p>
        <div className="flex items-center gap-x-1">
          <MemberAvatar name={assignee.name} />
          <div className="size-1 rounded-full bg-neutral-300" />
          <ProjectAvatar name={project.name} image={project.imageUrl} />
        </div>
      </div>
    </div>
  )
}
