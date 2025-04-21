import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import type { InferRequestType, InferResponseType } from "hono"

import { client } from "@/lib/rpc"

const joinWorkspaceRequest = client.api.workspaces[":workspaceId"].join.$post

type JoinWorkspaceRequest = typeof joinWorkspaceRequest
type RequestType = InferRequestType<JoinWorkspaceRequest>
type ResponseType = InferResponseType<JoinWorkspaceRequest, 200>

export const useJoinWorkspace = () => {
   const queryClient = useQueryClient()

   return useMutation<ResponseType, Error, RequestType>({
      mutationFn: async ({ json, param }) => {
         const res = await joinWorkspaceRequest({ json, param })

         if (!res.ok) {
            throw new Error("Failed to join workspace")
         }

         return await res.json()
      },
      onSuccess: ({ data }) => {
         toast.success("Joined workspace successfully")
         queryClient.invalidateQueries({ queryKey: ["workspaces"] })
         queryClient.invalidateQueries({ queryKey: ["workspace", data.$id] })
      },
      onError: () => {
         toast.error("Error joining workspace")
      }
   })
}
