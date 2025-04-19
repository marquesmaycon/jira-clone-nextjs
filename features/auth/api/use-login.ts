import { useMutation } from "@tanstack/react-query"
import type { InferRequestType, InferResponseType } from "hono"

import { client } from "@/lib/rpc"

type LoginRequest = (typeof client.api.auth.login)["$post"]
type RequestType = InferRequestType<LoginRequest>
type ResponseType = InferResponseType<LoginRequest>

export const useLogin = () =>
   useMutation<ResponseType, Error, RequestType>({
      mutationFn: async ({ json }) => {
         const res = await client.api.auth.login.$post({ json })
         return await res.json()
      }
   })
