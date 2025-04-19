import { useMutation } from "@tanstack/react-query"
import type { InferRequestType, InferResponseType } from "hono"

import { client } from "@/lib/rpc"

type RegisterRequest = (typeof client.api.auth.register)["$post"]
type RequestType = InferRequestType<RegisterRequest>
type ResponseType = InferResponseType<RegisterRequest>

export const useRegister = () =>
   useMutation<ResponseType, Error, RequestType>({
      mutationFn: async ({ json }) => {
         const res = await client.api.auth.register.$post({ json })
         return await res.json()
      }
   })
