import { ChevronRight, Trash } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React from "react"

import { Button } from "@/components/ui/button"
import { ProjectAvatar } from "@/features/projects/components/project-avatar"
import type { Project } from "@/features/projects/types"
import { useWorkspaceId } from "@/features/workspaces/hooks/user-workspace-id"
import { useConfirm } from "@/hooks/use-confirm"

import { useDeleteTask } from "../api/use-delete-task"
import type { Task } from "../types"

type TaskBreadcrumbsProps = {
  project: Project
  task: Task
}

export const TaskBreadcrumbs = ({ project, task }: TaskBreadcrumbsProps) => {
  const router = useRouter()
  const workspaceId = useWorkspaceId()

  const { mutateAsync: deleteTask, isPending } = useDeleteTask()
  const [ConfirmDialog, confirm] = useConfirm({
    title: "Delete task",
    message: "This action cannot be undone.",
    variant: "destructive"
  })

  const handleDelete = async () => {
    const ok = await confirm()
    if (!ok) return

    await deleteTask(
      { param: { taskId: task.$id } },
      {
        onSuccess: () => {
          router.push(`/workspaces/${workspaceId}/tasks`)
        }
      }
    )
  }

  return (
    <div className="flex items-center gap-x-2">
      <ProjectAvatar
        name={project.name}
        image={project.image}
        className="size-6 lg:size-8"
      />
      <Link href={`/workspaces/${workspaceId}/projects/${project.$id}`}>
        <p className="text-muted-foreground text-sm font-semibold transition hover:opacity-75 lg:text-lg">
          {project.name}
        </p>
      </Link>

      <ChevronRight className="text-muted-foreground size-4 lg:size-5" />

      <p className="text-sm font-semibold lg:text-lg">{task.name}</p>

      <Button
        className="ml-auto"
        variant="destructive"
        size="sm"
        onClick={handleDelete}
        disabled={isPending}
      >
        <Trash className="size-4 lg:mr-2" />
        <span className="hidden lg:block">Delete Task</span>
      </Button>

      <ConfirmDialog />
    </div>
  )
}
