import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { InferRequestType, InferResponseType } from "hono"

import { client } from "@/lib/rpc"
import { toast } from "sonner"

type UpdateWorkspaceRequest =
   (typeof client.api.workspaces)[":workspaceId"]["$patch"]
type RequestType = InferRequestType<UpdateWorkspaceRequest>
type ResponseType = InferResponseType<UpdateWorkspaceRequest, 200>

export const useUpdateWorkspace = () => {
   const queryClient = useQueryClient()

   return useMutation<ResponseType, Error, RequestType>({
      mutationFn: async ({ form, param }) => {
         const res = await client.api.workspaces[":workspaceId"].$patch({
            form,
            param
         })

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
