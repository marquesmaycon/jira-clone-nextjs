import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import type { InferRequestType, InferResponseType } from "hono"

import { client } from "@/lib/rpc"

const updateMemberRequest = client.api.members[":memberId"].$patch

type UpdateMemberRequest = typeof updateMemberRequest
type RequestType = InferRequestType<UpdateMemberRequest>
type ResponseType = InferResponseType<UpdateMemberRequest, 200>

export const useUpdateMember = () => {
   const queryClient = useQueryClient()

   return useMutation<ResponseType, Error, RequestType>({
      mutationFn: async ({ json, param }) => {
         const res = await updateMemberRequest({ json, param })

         if (!res.ok) {
            throw new Error("Failed to update member")
         }

         return await res.json()
      },
      onSuccess: () => {
         toast.success("Member updated successfully")
         queryClient.invalidateQueries({ queryKey: ["members"] })
      },
      onError: () => {
         toast.error("Error updating workspace")
      }
   })
}
