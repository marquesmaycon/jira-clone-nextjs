import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { InferRequestType, InferResponseType } from "hono"

import { client } from "@/lib/rpc"
import { useRouter } from "next/navigation"

type RegisterRequest = (typeof client.api.auth.register)["$post"]
type RequestType = InferRequestType<RegisterRequest>
type ResponseType = InferResponseType<RegisterRequest>

export const useRegister = () => {
   const router = useRouter()
   const queryClient = useQueryClient()

   return useMutation<ResponseType, Error, RequestType>({
      mutationFn: async ({ json }) => {
         const res = await client.api.auth.register.$post({ json })
         return await res.json()
      },
      onSuccess: () => {
         router.refresh()
         queryClient.invalidateQueries({ queryKey: ["current"] })
      }
   })
}
