import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import type { InferRequestType, InferResponseType } from "hono"

import { client } from "@/lib/rpc"

const updateWorkspaceRequest = client.api.workspaces[":workspaceId"].$patch

type UpdateWorkspaceRequest = typeof updateWorkspaceRequest
type RequestType = InferRequestType<UpdateWorkspaceRequest>
type ResponseType = InferResponseType<UpdateWorkspaceRequest, 200>

export const useUpdateWorkspace = () => {
   const queryClient = useQueryClient()

   return useMutation<ResponseType, Error, RequestType>({
      mutationFn: async ({ form, param }) => {
         const res = await updateWorkspaceRequest({ form, param })

         if (!res.ok) {
            throw new Error("Failed to update workspace")
         }

         return await res.json()
      },
      onSuccess: ({ data }) => {
         toast.success("Workspace updated successfully")
         queryClient.invalidateQueries({ queryKey: ["workspaces"] })
         queryClient.invalidateQueries({ queryKey: ["workspace", data.$id] })
      },
      onError: () => {
         toast.error("Error updating workspace")
      }
   })
}
