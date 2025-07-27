import { useQuery } from "@tanstack/react-query"

import { client } from "@/lib/rpc"

type UseTaskProps = {
  taskId: string
}

export const useTask = ({ taskId }: UseTaskProps) => {
  return useQuery({
    queryKey: ["task", taskId],
    queryFn: async () => {
      const res = await client.api.tasks[":taskId"].$get({ param: { taskId } })

      if (!res.ok) {
        throw new Error("Failed to fetch task")
      }

      const { data } = await res.json()

      return data
    }
  })
}
