import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import type { InferRequestType, InferResponseType } from "hono"

import { client } from "@/lib/rpc"

type CreateWorkspaceRequest = (typeof client.api.workspaces)["$post"]
type RequestType = InferRequestType<CreateWorkspaceRequest>
type ResponseType = InferResponseType<CreateWorkspaceRequest>

export const useCreateWorkspace = () => {
   const queryClient = useQueryClient()

   return useMutation<ResponseType, Error, RequestType>({
      mutationFn: async ({ form }) => {
         const res = await client.api.workspaces.$post({ form })

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
