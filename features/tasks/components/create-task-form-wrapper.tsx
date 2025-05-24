import { Card, CardContent } from "@/components/ui/card"
import { useMembers } from "@/features/members/api/use-members"
import { useProjects } from "@/features/projects/api/use-projects"
import { useWorkspaceId } from "@/features/workspaces/hooks/user-workspace-id"
import { Loader } from "lucide-react"
import { CreateTaskForm } from "./create-task-form"

type CreateTaskFormWrapperProps = {
  onCancel: () => void
}
export const CreateTaskFormWrapper = ({
  onCancel
}: CreateTaskFormWrapperProps) => {
  const workspaceId = useWorkspaceId()
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

  const isLoading = isLoadingProjects || isLoadingMembers

  if (isLoading) {
    return (
      <Card className="h-[714px] w-full border-none shadow-none">
        <CardContent className="flex h-full items-center justify-center">
          <Loader className="text-muted-foreground size-4 animate-spin" />
        </CardContent>
      </Card>
    )
  }

  return <CreateTaskForm />
}
