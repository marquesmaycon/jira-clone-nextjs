import { useQuery } from "@tanstack/react-query"

import { client } from "@/lib/rpc"

export const useTasks = ({ workspaceId }: { workspaceId: string }) => {
  return useQuery({
    queryKey: ["tasks", workspaceId],
    queryFn: async () => {
      const res = await client.api.tasks.$get({ query: { workspaceId } })

      if (!res.ok) {
        throw new Error("Failed to fetch tasks")
      }

      const { data } = await res.json()

      return data
    }
  })
}
