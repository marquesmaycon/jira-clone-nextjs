"use client"

import { useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeftIcon, ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"

import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage
} from "@/components/ui/form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DottedSeparator } from "@/components/dotted-separator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { type UpdateProjectSchema, updateProjectSchema } from "../schemas"
import type { Project } from "../types"
import { useUpdateProject } from "../api/use-update-project"
import { useConfirm } from "@/hooks/use-confirm"
import { useDeleteProject } from "../api/use-delete-project"

type UpdateProjectFormProps = {
   onCancel?: () => void
   project: Project
}

export const UpdateProjectForm = ({
   onCancel,
   project
}: UpdateProjectFormProps) => {
   const router = useRouter()
   const { mutate, isPending } = useUpdateProject()
   const { mutate: del, isPending: isDeleting } = useDeleteProject()

   const [DeleteDialog, confirmDelete] = useConfirm({
      title: "Delete Project?",
      message: "This action is irreversible.",
      variant: "destructive"
   })

   const inputRef = useRef<HTMLInputElement>(null)

   const form = useForm<UpdateProjectSchema>({
      resolver: zodResolver(updateProjectSchema),
      defaultValues: {
         ...project,
         image: project.imageUrl ?? ""
      }
   })

   const handleDelete = async () => {
      const confirmed = await confirmDelete()

      if (!confirmed) return

      del(
         { param: { projectId: project.$id } },
         {
            onSuccess: () => {
               router.push(`/workspaces/${project.workspaceId}`)
            }
         }
      )
   }

   const onSubmit = (data: UpdateProjectSchema) => {
      const finalValues = {
         ...data,
         image: data.image instanceof File ? data.image : ""
      }

      mutate(
         { form: finalValues, param: { projectId: project.$id } },
         {
            onSuccess: () => {
               form.reset()
            }
         }
      )
   }

   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
         form.setValue("image", file)
      }
   }

   return (
      <div className="space-y-4">
         <Card className="h-full w-full border-none shadow-none">
            <CardHeader className="flex flex-row items-center space-y-0 gap-x-4 p-7">
               <Button
                  size="sm"
                  variant="secondary"
                  type="button"
                  className=""
                  onClick={
                     onCancel
                        ? onCancel
                        : () =>
                             router.push(
                                `/workspaces/${project.workspaceId}/projects/${project.$id}`
                             )
                  }
               >
                  <ArrowLeftIcon className="mr-2 size-4" />
                  Back
               </Button>
               <CardTitle className="text-xl font-bold">
                  {project.name}
               </CardTitle>
            </CardHeader>
            <div className="px-7">
               <DottedSeparator />
            </div>
            <CardContent className="p-7">
               <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                     <div className="space-y-4">
                        <FormField
                           control={form.control}
                           name="name"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel>Project Name</FormLabel>
                                 <FormControl>
                                    <Input
                                       {...field}
                                       placeholder="Enter workspace name"
                                    />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                        <FormField
                           control={form.control}
                           name="image"
                           render={({ field }) => (
                              <div className="flex flex-col gap-y-2">
                                 <div className="flex items-center gap-x-5">
                                    {field.value ? (
                                       <div className="relative size-18 overflow-hidden rounded-md">
                                          <Image
                                             src={
                                                field.value instanceof File
                                                   ? URL.createObjectURL(
                                                        field.value
                                                     )
                                                   : field.value
                                             }
                                             fill
                                             alt="Project Image"
                                             className="object-cover"
                                          />
                                       </div>
                                    ) : (
                                       <Avatar className="size-18">
                                          <AvatarFallback>
                                             <ImageIcon className="size-9 text-neutral-400" />
                                          </AvatarFallback>
                                       </Avatar>
                                    )}
                                    <div className="flex flex-col">
                                       <p className="text-sm">Project Icon</p>
                                       <p className="text-muted-foreground text-sm">
                                          JPG, SVG, PNG or JPEG, max 1mb
                                       </p>
                                       <input
                                          type="file"
                                          className="hidden"
                                          accept=".jpg,.png,.svg,.jpeg"
                                          ref={inputRef}
                                          disabled={isPending}
                                          onChange={handleImageChange}
                                       />
                                       {field.value ? (
                                          <Button
                                             type="button"
                                             disabled={isPending}
                                             variant="destructive"
                                             size="xs"
                                             className="mt-2 w-fit"
                                             onClick={() => {
                                                field.onChange(null)
                                                if (inputRef.current) {
                                                   inputRef.current.value = ""
                                                }
                                             }}
                                          >
                                             Remove Image
                                          </Button>
                                       ) : (
                                          <Button
                                             type="button"
                                             disabled={isPending}
                                             variant="teritary"
                                             size="xs"
                                             className="mt-2 w-fit"
                                             onClick={() =>
                                                inputRef.current?.click()
                                             }
                                          >
                                             Upload Image
                                          </Button>
                                       )}
                                    </div>
                                 </div>
                              </div>
                           )}
                        />
                        <DottedSeparator className="py-7" />
                        <div className="flex items-center justify-between">
                           <Button
                              type="button"
                              size="lg"
                              variant="secondary"
                              disabled={isPending}
                              onClick={onCancel}
                              className={cn(!onCancel && "invisible")}
                           >
                              Cancel
                           </Button>

                           <Button type="submit" size="lg" disabled={isPending}>
                              Save Changes
                           </Button>
                        </div>
                     </div>
                  </form>
               </Form>
            </CardContent>
         </Card>

         <Card className="h-full w-full border-none shadow-none">
            <CardContent className="flex flex-col p-7">
               <h3 className="font-bold">Danger Zone</h3>
               <p className="text-muted-foreground text-sm">
                  Deleting a workspace is irreversible and will remove all
                  associated data.
               </p>
               <DottedSeparator className="py-7" />
               <Button
                  variant="destructive"
                  type="button"
                  size="sm"
                  disabled={isPending || isDeleting}
                  className="mt-6 ml-auto w-fit"
                  onClick={handleDelete}
               >
                  Delete Project
               </Button>
            </CardContent>
         </Card>
         <DeleteDialog />
      </div>
   )
}
