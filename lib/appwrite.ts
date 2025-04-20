import "server-only"

import { Account, Client } from "node-appwrite"
import { APPWRITE_ENDPOINT, APPWRITE_PROJECT } from "@/config"

export async function createAdminClient() {
   const client = new Client()
      .setEndpoint(APPWRITE_ENDPOINT)
      .setProject(APPWRITE_PROJECT)
      .setKey(process.env.NEXT_APPWRITE_KEY!)

   return {
      get account() {
         return new Account(client)
      }
   }
}
