import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import type { InferRequestType, InferResponseType } from "hono"

import { client } from "@/lib/rpc"

const createProjectRequest = client.api.projects.$post

type CreateProjectRequest = typeof createProjectRequest
type RequestType = InferRequestType<CreateProjectRequest>
type ResponseType = InferResponseType<CreateProjectRequest, 200>

export const useCreateProject = () => {
   const queryClient = useQueryClient()

   return useMutation<ResponseType, Error, RequestType>({
      mutationFn: async ({ form }) => {
         const res = await createProjectRequest({ form })

         if (!res.ok) {
            const data = await res.json()
            throw new Error(data.error)
         }

         return await res.json()
      },
      onSuccess: () => {
         toast.success("Project created successfully")
         queryClient.invalidateQueries({ queryKey: ["projects"] })
      },
      onError: () => {
         toast.error("An error occurred while creating the project.")
      }
   })
}