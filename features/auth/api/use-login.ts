import type { InferRequestType, InferResponseType } from "hono"

import { client } from "@/lib/rpc"
import { useMutation } from "@tanstack/react-query"

type LoginRequest = (typeof client.api.auth.login)["$post"]
type RequestType = InferRequestType<LoginRequest>
type ResponseType = InferResponseType<LoginRequest>

export const useLogin = () => {
   return useMutation<ResponseType, Error, RequestType>({
      mutationFn: async ({ json }) => {
         const res = await client.api.auth.login.$post({ json })
         return await res.json()
      }
   })
}
