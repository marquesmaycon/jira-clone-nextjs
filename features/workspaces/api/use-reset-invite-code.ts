import { useRouter } from "next/navigation"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import type { InferRequestType, InferResponseType } from "hono"

import { client } from "@/lib/rpc"

const resetInviteCodeRequest =
   client.api.workspaces[":workspaceId"]["reset-invite-code"].$post

type ResetInviteCodeRequest = typeof resetInviteCodeRequest
type RequestType = InferRequestType<ResetInviteCodeRequest>
type ResponseType = InferResponseType<ResetInviteCodeRequest, 200>

export const useResetInviteCode = () => {
   const queryClient = useQueryClient()
   const router = useRouter()

   return useMutation<ResponseType, Error, RequestType>({
      mutationFn: async ({ param }) => {
         const res = await resetInviteCodeRequest({ param })

         if (!res.ok) {
            throw new Error("Failed to reset invite code")
         }

         return await res.json()
      },
      onSuccess: ({ data }) => {
         toast.success("Invite code reseted successfully")
         router.refresh()
         queryClient.invalidateQueries({ queryKey: ["workspaces"] })
         queryClient.invalidateQueries({ queryKey: ["workspace", data.$id] })
      },
      onError: () => {
         toast.error("Error resetting invite code")
      }
   })
}
