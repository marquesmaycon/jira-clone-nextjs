import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { InferRequestType, InferResponseType } from "hono"

import { client } from "@/lib/rpc"

type CreateWorkspaceRequest = (typeof client.api.workspaces)["$post"]
type RequestType = InferRequestType<CreateWorkspaceRequest>
type ResponseType = InferResponseType<CreateWorkspaceRequest>

export const useCreateWorkspace = () => {
   const queryClient = useQueryClient()

   return useMutation<ResponseType, Error, RequestType>({
      mutationFn: async ({ json }) => {
         const res = await client.api.workspaces.$post({ json })
         return await res.json()
      },
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["workspaces"] })
      }
   })
}
