import { useRouter } from "next/navigation"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import type { InferRequestType, InferResponseType } from "hono"

import { client } from "@/lib/rpc"

type RegisterRequest = (typeof client.api.auth.register)["$post"]
type RequestType = InferRequestType<RegisterRequest>
type ResponseType = InferResponseType<RegisterRequest>

export const useRegister = () => {
   const router = useRouter()
   const queryClient = useQueryClient()

   return useMutation<ResponseType, Error, RequestType>({
      mutationFn: async ({ json }) => {
         const res = await client.api.auth.register.$post({ json })

         if (!res.ok) {
            throw new Error("Error registering")
         }

         return await res.json()
      },
      onSuccess: () => {
         toast.success("Registration successful")
         router.refresh()
         queryClient.invalidateQueries({ queryKey: ["current"] })
      },
      onError: () => {
         toast.error("Error registering")
      }
   })
}
