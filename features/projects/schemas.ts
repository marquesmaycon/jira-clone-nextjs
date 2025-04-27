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

export const updateProjectSchema = z.object({
   name: z.string().min(1, "Minimum name length is 1").trim().optional(),
   image: z
      .union([
         z.instanceof(File),
         z.string().transform((val) => (val === "" ? undefined : val))
      ])
      .optional(),
   workspaceId: z.string()
})

export type UpdateProjectSchema = z.infer<typeof updateProjectSchema>
