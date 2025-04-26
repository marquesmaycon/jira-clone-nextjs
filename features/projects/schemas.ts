import { z } from "zod"

export const createProjectSchema = z.object({
   name: z.string().min(1, "Name is required").trim(),
   image: z
      .union([
         z.instanceof(File),
         z.string().transform((val) => (val === "" ? undefined : val))
      ])
      .optional(),
   workspaceId: z.string()
})

export type CreateProjectSchema = z.infer<typeof createProjectSchema>
