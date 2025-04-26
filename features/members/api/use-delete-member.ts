import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import type { InferRequestType, InferResponseType } from "hono"

import { client } from "@/lib/rpc"

const deleteMemberRequest = client.api.members[":memberId"].$delete

type DeleteMemberRequest = typeof deleteMemberRequest
type RequestType = InferRequestType<DeleteMemberRequest>
type ResponseType = InferResponseType<DeleteMemberRequest>

export const useDeleteMember = () => {
   const queryClient = useQueryClient()

   return useMutation<ResponseType, Error, RequestType>({
      mutationFn: async ({ param }) => {
         const res = await deleteMemberRequest({ param })

         if (!res.ok) {
            throw new Error("Failed to delete member")
         }

         return await res.json()
      },
      onSuccess: () => {
         toast.success("Member deleted successfully")
         queryClient.invalidateQueries({ queryKey: ["members"] })
      },
      onError: () => {
         toast.error("Error deleting member")
      }
   })
}
