import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import type { InferRequestType, InferResponseType } from "hono"

import { client } from "@/lib/rpc"
import { useRouter } from "next/navigation"

const updateProjectRequest = client.api.projects[":projectId"].$patch

type UpdateProjectRequest = typeof updateProjectRequest
type RequestType = InferRequestType<UpdateProjectRequest>
type ResponseType = InferResponseType<UpdateProjectRequest, 200>

export const useUpdateProject = () => {
   const queryClient = useQueryClient()
   const router = useRouter()

   return useMutation<ResponseType, Error, RequestType>({
      mutationFn: async ({ form, param }) => {
         const res = await updateProjectRequest({ form, param })

         if (!res.ok) {
            const data = await res.json()
            throw new Error(data.error)
         }

         return await res.json()
      },
      onSuccess: ({ data }) => {
         toast.success("Project updated successfully")
         router.refresh()
         queryClient.invalidateQueries({ queryKey: ["projects"] })
         queryClient.invalidateQueries({ queryKey: ["project", data.$id] })
      },
      onError: () => {
         toast.error("An error occurred while updating the project.")
      }
   })
}
