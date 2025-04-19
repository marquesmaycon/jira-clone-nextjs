import { Hono } from "hono"
import { zValidator } from "@hono/zod-validator"
import { signInSchema } from "../schemas"

const app = new Hono().post("/login", zValidator("json", signInSchema), async (c) => {
   const { email, password } = c.req.valid("json")

   console.log({ email, password })

   return c.json({ message: "Logged in", data: { email, password } })
})

export default app
