import { z } from "zod"

export const createWorkspaceSchema = z.object({
   name: z.string().min(1, "Name is required").trim(),
   image: z
      .union([
         z.instanceof(File),
         z.string().transform((val) => (val === "" ? undefined : val))
      ])
      .optional()
})

export type CreateWorkspaceSchema = z.infer<typeof createWorkspaceSchema>

export const updateWorkspaceSchema = z.object({
   name: z.string().trim().min(1, "Must be 1 or more characters").optional(),
   image: z
      .union([
         z.instanceof(File),
         z
            .string()
            .transform((val) => (val === null || val === "" ? undefined : val))
      ])
      .nullish()
})

export type UpdateWorkspaceSchema = z.infer<typeof updateWorkspaceSchema>
