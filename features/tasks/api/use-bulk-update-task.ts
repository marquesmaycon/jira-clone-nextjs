import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import type { InferRequestType, InferResponseType } from "hono"

import { client } from "@/lib/rpc"

const bulkUpdateTaskRequest = client.api.tasks["bulk-update"].$post

type BulkUpdateTaskRequest = typeof bulkUpdateTaskRequest
type RequestType = InferRequestType<BulkUpdateTaskRequest>
type ResponseType = InferResponseType<BulkUpdateTaskRequest, 200>

export const useBulkUpdateTask = () => {
  const queryClient = useQueryClient()

  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const res = await bulkUpdateTaskRequest({ json })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error)
      }

      return await res.json()
    },
    onSuccess: () => {
      toast.success("Tasks updated successfully")
      queryClient.invalidateQueries({ queryKey: ["tasks"] })
    },
    onError: () => {
      toast.error("An error occurred while updating the tasks.")
    }
  })
}
