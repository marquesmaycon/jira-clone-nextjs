import { useRouter } from "next/navigation"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import type { InferRequestType, InferResponseType } from "hono"

import { client } from "@/lib/rpc"

const registerRequest = client.api.auth.register.$post

type RegisterRequest = typeof registerRequest
type RequestType = InferRequestType<RegisterRequest>
type ResponseType = InferResponseType<RegisterRequest>

export const useRegister = () => {
   const router = useRouter()
   const queryClient = useQueryClient()

   return useMutation<ResponseType, Error, RequestType>({
      mutationFn: async ({ json }) => {
         const res = await registerRequest({ json })

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
