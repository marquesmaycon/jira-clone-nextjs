import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import type { InferRequestType, InferResponseType } from "hono"

import { client } from "@/lib/rpc"

const createTaskRequest = client.api.tasks.$post

type CreateTaskRequest = typeof createTaskRequest
type RequestType = InferRequestType<CreateTaskRequest>
type ResponseType = InferResponseType<CreateTaskRequest, 201>

export const useCreateTask = () => {
  const queryClient = useQueryClient()

  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const res = await createTaskRequest({ json })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error)
      }

      return await res.json()
    },
    onSuccess: () => {
      toast.success("Task created successfully")
      queryClient.invalidateQueries({ queryKey: ["tasks"] })
    },
    onError: () => {
      toast.error("An error occurred while creating the task.")
    }
  })
}
