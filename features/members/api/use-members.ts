import { useQuery } from "@tanstack/react-query"

import { client } from "@/lib/rpc"

export const useMembers = ({ workspaceId }: { workspaceId: string }) => {
   return useQuery({
      queryKey: ["members", workspaceId],
      queryFn: async () => {
         const res = await client.api.members.$get({ query: { workspaceId } })

         if (!res.ok) {
            throw new Error("Failed to fetch members")
         }

         const { data } = await res.json()

         return data
      }
   })
}
