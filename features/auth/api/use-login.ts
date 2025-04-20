import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { InferRequestType, InferResponseType } from "hono"

import { client } from "@/lib/rpc"
import { useRouter } from "next/navigation"

type LoginRequest = (typeof client.api.auth.login)["$post"]
type RequestType = InferRequestType<LoginRequest>
type ResponseType = InferResponseType<LoginRequest>

export const useLogin = () => {
   const router = useRouter()
   const queryClient = useQueryClient()

   return useMutation<ResponseType, Error, RequestType>({
      mutationFn: async ({ json }) => {
         const res = await client.api.auth.login.$post({ json })
         return await res.json()
      },
      onSuccess: () => {
         router.refresh()
         queryClient.invalidateQueries({ queryKey: ["current"] })
      }
   })
}
