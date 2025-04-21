import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import type { InferRequestType, InferResponseType } from "hono"

import { client } from "@/lib/rpc"

const createWorkspaceRequest = client.api.workspaces.$post

type CreateWorkspaceRequest = typeof createWorkspaceRequest
type RequestType = InferRequestType<CreateWorkspaceRequest>
type ResponseType = InferResponseType<CreateWorkspaceRequest>

export const useCreateWorkspace = () => {
   const queryClient = useQueryClient()

   return useMutation<ResponseType, Error, RequestType>({
      mutationFn: async ({ form }) => {
         const res = await createWorkspaceRequest({ form })

         if (!res.ok) {
            throw new Error("Failed to create workspace")
         }

         return await res.json()
      },
      onSuccess: () => {
         toast.success("Workspace created successfully")
         queryClient.invalidateQueries({ queryKey: ["workspaces"] })
      },
      onError: () => {
         toast.error("Error creating workspace")
      }
   })
}
