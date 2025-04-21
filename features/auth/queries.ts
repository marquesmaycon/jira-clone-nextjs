import { cookies } from "next/headers"
import { Account, Client } from "node-appwrite"

import { APPWRITE_ENDPOINT, APPWRITE_PROJECT } from "@/config"

import { AUTH_COOKIE } from "./constants"

export const getCurrent = async () => {
   try {
      const appCookies = await cookies()
      const session = appCookies.get(AUTH_COOKIE)

      if (!session) return null

      const client = new Client()
         .setEndpoint(APPWRITE_ENDPOINT)
         .setProject(APPWRITE_PROJECT)

      client.setSession(session.value)

      const account = new Account(client)

      return await account.get()
   } catch {
      return null
   }
}
