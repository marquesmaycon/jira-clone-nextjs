import { useRouter } from "next/navigation"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import type { InferRequestType, InferResponseType } from "hono"

import { client } from "@/lib/rpc"

const loginRequest = client.api.auth.login.$post

type LoginRequest = typeof loginRequest
type RequestType = InferRequestType<LoginRequest>
type ResponseType = InferResponseType<LoginRequest>

export const useLogin = () => {
   const router = useRouter()
   const queryClient = useQueryClient()

   return useMutation<ResponseType, Error, RequestType>({
      mutationFn: async ({ json }) => {
         const res = await loginRequest({ json })

         if (!res.ok) {
            throw new Error("Failed logging in")
         }

         return await res.json()
      },
      onSuccess: () => {
         toast.success("Login successful")
         router.refresh()
         queryClient.invalidateQueries({ queryKey: ["current"] })
      },
      onError: () => {
         toast.error("Error logging in")
      }
   })
}
