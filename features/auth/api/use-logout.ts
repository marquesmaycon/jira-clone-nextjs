import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import type { InferResponseType } from "hono"

import { client } from "@/lib/rpc"
import { useRouter } from "next/navigation"

type LogoutRequest = (typeof client.api.auth.logout)["$post"]
type ResponseType = InferResponseType<LogoutRequest>

export const useLogout = () => {
   const router = useRouter()
   const queryClient = useQueryClient()

   return useMutation<ResponseType>({
      mutationFn: async () => {
         const res = await client.api.auth.logout.$post()

         if (!res.ok) {
            throw new Error("Failed logging out")
         }

         return await res.json()
      },
      onSuccess: () => {
         toast.success("Logout successful")
         router.refresh()
         queryClient.invalidateQueries({ queryKey: ["current"] })
         queryClient.invalidateQueries({ queryKey: ["workspaces"] })
      },
      onError: () => {
         toast.error("Error logging out")
      }
   })
}
