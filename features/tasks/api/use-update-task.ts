import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import type { InferRequestType, InferResponseType } from "hono"

import { client } from "@/lib/rpc"

const updateTaskRequest = client.api.tasks[":taskId"].$patch

type UpdateTaskRequest = typeof updateTaskRequest
type RequestType = InferRequestType<UpdateTaskRequest>
type ResponseType = InferResponseType<UpdateTaskRequest, 201>

export const useUpdateTask = () => {
  const queryClient = useQueryClient()

  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json, param }) => {
      const res = await updateTaskRequest({ json, param })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error)
      }

      return await res.json()
    },
    onSuccess: ({ data }) => {
      toast.success("Task updated successfully")
      queryClient.invalidateQueries({ queryKey: ["tasks"] })
      queryClient.invalidateQueries({ queryKey: ["task", data.$id] })
    },
    onError: () => {
      toast.error("An error occurred while updating the task.")
    }
  })
}
