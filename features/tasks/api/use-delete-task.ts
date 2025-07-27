import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import type { InferRequestType, InferResponseType } from "hono"

import { client } from "@/lib/rpc"

const deleteTaskRequest = client.api.tasks[":taskId"].$delete

type DeleteTaskRequest = typeof deleteTaskRequest
type RequestType = InferRequestType<DeleteTaskRequest>
type ResponseType = InferResponseType<DeleteTaskRequest, 200>

export const useDeleteTask = () => {
  const queryClient = useQueryClient()

  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const res = await deleteTaskRequest({ param })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error)
      }

      return await res.json()
    },
    onSuccess: ({ data }) => {
      toast.success("Task deleted successfully")
      queryClient.invalidateQueries({ queryKey: ["tasks"] })
      queryClient.invalidateQueries({ queryKey: ["task", data.$id] })
    },
    onError: () => {
      toast.error("An error occurred while deleting the task.")
    }
  })
}
