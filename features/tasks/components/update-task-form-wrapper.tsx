import { Loader } from "lucide-react"

import { useMembers } from "@/features/members/api/use-members"
import { useProjects } from "@/features/projects/api/use-projects"
import { useWorkspaceId } from "@/features/workspaces/hooks/user-workspace-id"
import { Card, CardContent } from "@/components/ui/card"

import { useTask } from "../api/use-task"
import { UpdateTaskForm } from "./update-task-form"

type UpdateTaskFormWrapperProps = {
  onCancel: () => void
  id: string
}
export const UpdateTaskFormWrapper = ({
  onCancel,
  id
}: UpdateTaskFormWrapperProps) => {
  const workspaceId = useWorkspaceId()

  const { data: task, isLoading: isLoadingTask } = useTask({ taskId: id })

  const { data: projects, isLoading: isLoadingProjects } = useProjects({
    workspaceId
  })
  const { data: members, isLoading: isLoadingMembers } = useMembers({
    workspaceId
  })

  const projectsOptions = projects?.documents.map((project) => ({
    id: project.$id,
    name: project.name,
    imageUrl: project.imageUrl
  }))

  const membersOptions = members?.documents.map((member) => ({
    id: member.$id,
    name: member.name
  }))

  const isLoading = isLoadingProjects || isLoadingMembers || isLoadingTask

  if (!task) {
    return null
  }

  if (isLoading) {
    return (
      <Card className="h-[714px] w-full border-none shadow-none">
        <CardContent className="flex h-full items-center justify-center">
          <Loader className="text-muted-foreground size-4 animate-spin" />
        </CardContent>
      </Card>
    )
  }

  return (
    <UpdateTaskForm
      onCancel={onCancel}
      projectOptions={projectsOptions ?? []}
      memberOptions={membersOptions ?? []}
      task={task}
    />
  )
}
