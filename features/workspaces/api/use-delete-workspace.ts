import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import type { InferRequestType, InferResponseType } from "hono"

import { client } from "@/lib/rpc"

type DeleteWorkspaceRequest =
   (typeof client.api.workspaces)[":workspaceId"]["$delete"]
type RequestType = InferRequestType<DeleteWorkspaceRequest>
type ResponseType = InferResponseType<DeleteWorkspaceRequest, 200>

export const useDeleteWorkspace = () => {
   const queryClient = useQueryClient()

   return useMutation<ResponseType, Error, RequestType>({
      mutationFn: async ({ param }) => {
         const res = await client.api.workspaces[":workspaceId"].$delete({
            param
         })

         if (!res.ok) {
            throw new Error("Failed to delete workspace")
         }

         return await res.json()
      },
      onSuccess: ({ data }) => {
         toast.success("Workspace deleted successfully")
         queryClient.invalidateQueries({ queryKey: ["workspaces"] })
         queryClient.invalidateQueries({ queryKey: ["workspace", data.$id] })
      },
      onError: () => {
         toast.error("Error deleting workspace")
      }
   })
}
