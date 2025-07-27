import { useRouter } from "next/navigation"
import { ExternalLinkIcon, PencilIcon, TrashIcon } from "lucide-react"

import { useWorkspaceId } from "@/features/workspaces/hooks/user-workspace-id"
import { useConfirm } from "@/hooks/use-confirm"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

import { useDeleteTask } from "../api/use-delete-task"
import { useUpdateTaskModal } from "../hooks/use-update-task-modal"

type TaskActionsProps = React.PropsWithChildren<{
  id: string
  projectId: string
}>

export const TaskActions = ({ id, projectId, children }: TaskActionsProps) => {
  const router = useRouter()
  const workspaceId = useWorkspaceId()

  const { open } = useUpdateTaskModal()
  const { mutateAsync: deleteTask, isPending } = useDeleteTask()

  const [ConfirmDialog, confirm] = useConfirm({
    title: "Delete Task",
    message: "Are you sure you want to delete this task? This action cannot be undone.",
    variant: "destructive",
  })

  const onDelete = async () => {
    const ok = await confirm()
    if (!ok) return
    await deleteTask({ param: { taskId: id } })
  }

  const openTask = () => {
    router.push(`/workspaces/${workspaceId}/tasks/${id}`)
  }

  const openProject = () => {
    router.push(`/workspaces/${workspaceId}/projects/${projectId}`)
  }

  return (
    <div className="flex justify-end">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem className="p-2.5 font-medium" onClick={openTask} >
            <ExternalLinkIcon className="mr-2 size-4 stroke-2" />
            Task Details
          </DropdownMenuItem>
          <DropdownMenuItem className="p-2.5 font-medium" onClick={openProject}>
            <ExternalLinkIcon className="mr-2 size-4 stroke-2" />
            Open Project
          </DropdownMenuItem>
          <DropdownMenuItem className="p-2.5 font-medium" onClick={() => open(id)}>
            <PencilIcon className="mr-2 size-4 stroke-2" />
            Edit Task
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={isPending}
            className="p-2.5 font-medium text-amber-700 focus:text-amber-700"
            onClick={onDelete}
          >
            <TrashIcon className="mr-2 size-4 stroke-2" />
            Delete Task
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ConfirmDialog />
    </div>
  )
}
