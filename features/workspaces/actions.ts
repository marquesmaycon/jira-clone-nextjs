import { cookies } from "next/headers"
import { Account, Client, Databases, Query } from "node-appwrite"

import {
   APPWRITE_ENDPOINT,
   APPWRITE_PROJECT,
   DATABASE_ID,
   MEMBERS_ID,
   WORKSPACES_ID
} from "@/config"

import { AUTH_COOKIE } from "../auth/constants"

export const getWorkspaces = async () => {
   try {
      const appCookies = await cookies()
      const session = appCookies.get(AUTH_COOKIE)

      if (!session) {
         return { documents: [], total: 0 }
      }

      const client = new Client()
         .setEndpoint(APPWRITE_ENDPOINT)
         .setProject(APPWRITE_PROJECT)

      client.setSession(session.value)

      const databases = new Databases(client)
      const account = new Account(client)
      const user = await account.get()

      const members = await databases.listDocuments(DATABASE_ID, MEMBERS_ID, [
         Query.equal("userId", user.$id)
      ])

      if (members.total === 0) {
         return { documents: [], total: 0 }
      }

      const workspaceIds = members.documents.map((member) => member.workspaceId)

      const workspaces = await databases.listDocuments(
         DATABASE_ID,
         WORKSPACES_ID,
         [Query.orderDesc("$createdAt"), Query.contains("$id", workspaceIds)]
      )
      return workspaces
   } catch {
      return null
   }
}
