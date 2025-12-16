import "server-only"

import { cookies } from "next/headers"
import { Account, Client, Databases, Users } from "node-appwrite"

import { APPWRITE_ENDPOINT, APPWRITE_PROJECT } from "@/config"
import { AUTH_COOKIE } from "@/features/auth/constants"

export async function createSessionClient() {
   const appCookies = await cookies()
   const session = appCookies.get(AUTH_COOKIE)

   if (!session || !session.value) {
      throw new Error("Unauthorized")
   }

   const client = new Client()
      .setEndpoint(APPWRITE_ENDPOINT)
      .setProject(APPWRITE_PROJECT)

   client.setSession(session.value)

   return {
      get account() {
         return new Account(client)
      },
      get databases() {
         return new Databases(client)
      }
   }
}

export async function createAdminClient() {
   const client = new Client()
      .setEndpoint(APPWRITE_ENDPOINT)
      .setProject(APPWRITE_PROJECT)
      .setKey(process.env.NEXT_APPWRITE_KEY!)

   return {
      get account() {
         return new Account(client)
      },
      get users() {
         return new Users(client)
      }
   }
}
