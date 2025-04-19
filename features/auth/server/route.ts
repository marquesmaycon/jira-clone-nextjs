import { Hono } from "hono"
import { zValidator } from "@hono/zod-validator"
import { signInSchema } from "../schemas"

const app = new Hono().post("/login", zValidator("json", signInSchema), async (c) => {
   return c.json({ message: "Login successful" })
})

export default app
