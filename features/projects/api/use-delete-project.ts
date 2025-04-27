import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import type { InferRequestType, InferResponseType } from "hono"

import { client } from "@/lib/rpc"
import { useRouter } from "next/navigation"

const deleteProjectRequest = client.api.projects[":projectId"].$delete

type DeleteProjectRequest = typeof deleteProjectRequest
type RequestType = InferRequestType<DeleteProjectRequest>
type ResponseType = InferResponseType<DeleteProjectRequest, 200>

export const useDeleteProject = () => {
   const queryClient = useQueryClient()
   const router = useRouter()

   return useMutation<ResponseType, Error, RequestType>({
      mutationFn: async ({ param }) => {
         const res = await deleteProjectRequest({ param })

         if (!res.ok) {
            const data = await res.json()
            throw new Error(data.error)
         }

         return await res.json()
      },
      onSuccess: ({ data }) => {
         toast.success("Project deleted successfully")
         router.refresh()
         queryClient.invalidateQueries({ queryKey: ["projects"] })
         queryClient.invalidateQueries({ queryKey: ["project", data.$id] })
      },
      onError: () => {
         toast.error("An error occurred while deleting the project.")
      }
   })
}
