import { useMutation, useQueryClient } from "@tanstack/react-query"
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
         return await res.json()
      },
      onSuccess: () => {
         router.refresh()
         queryClient.invalidateQueries({ queryKey: ["current"] })
      }
   })
}
