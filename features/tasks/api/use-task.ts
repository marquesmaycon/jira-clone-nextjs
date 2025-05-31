import { useQuery } from "@tanstack/react-query"

import { client } from "@/lib/rpc"

type UseTasksProps = {
  workspaceId: string
  projectId?: string | null
  status?: "open" | "closed" | "all" | null
  assigneeId?: string | null
  dueDate?: string | null
  search?: string | null
}

export const useTasks = ({
  workspaceId,
  projectId,
  status,
  assigneeId,
  dueDate,
  search
}: UseTasksProps) => {
  return useQuery({
    queryKey: [
      "tasks",
      { workspaceId, projectId, status, assigneeId, dueDate, search }
    ],
    queryFn: async () => {
      const res = await client.api.tasks.$get({
        query: {
          workspaceId,
          projectId: projectId ?? undefined,
          status: status ?? undefined,
          assigneeId: assigneeId ?? undefined,
          dueDate: dueDate ?? undefined,
          search: search ?? undefined
        }
      })

      if (!res.ok) {
        throw new Error("Failed to fetch tasks")
      }

      const { data } = await res.json()

      return data
    }
  })
}
