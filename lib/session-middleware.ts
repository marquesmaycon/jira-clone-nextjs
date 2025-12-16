import "server-only"

import { getCookie } from "hono/cookie"
import { createMiddleware } from "hono/factory"
import { Account, Client, Databases, Models, Storage } from "node-appwrite"

import { APPWRITE_ENDPOINT, APPWRITE_PROJECT } from "@/config"
import { AUTH_COOKIE } from "@/features/auth/constants"

type AdditionalContext = {
   Variables: {
      account: Account
      databases: Databases
      storage: Storage
      user: Models.User<Models.Preferences>
   }
}

export const sessionMiddleware = createMiddleware<AdditionalContext>(
   async (c, next) => {
      const client = new Client()
         .setEndpoint(APPWRITE_ENDPOINT)
         .setProject(APPWRITE_PROJECT)

      const session = getCookie(c, AUTH_COOKIE)

      if (!session) {
         return c.json({ error: "Unauthorized" }, 401)
      }

      client.setSession(session)

      const account = new Account(client)
      const databases = new Databases(client)
      const storage = new Storage(client)

      const user = await account.get()

      c.set("account", account)
      c.set("databases", databases)
      c.set("storage", storage)
      c.set("user", user)

      await next()
   }
)
