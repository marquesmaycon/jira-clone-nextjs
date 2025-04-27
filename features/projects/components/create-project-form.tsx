"use client"

import { useRef } from "react"
// import { useRouter } from "next/navigation"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ImageIcon } from "lucide-react"

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
import { cn } from "@/lib/utils"

import { useCreateProject } from "../api/use-create-project"
import { CreateProjectSchema, createProjectSchema } from "../schemas"
import { useWorkspaceId } from "@/features/workspaces/hooks/user-workspace-id"

type CreateProjectFormProps = {
   onCancel?: () => void
}

export const CreateProjectForm = ({ onCancel }: CreateProjectFormProps) => {
   // const router = useRouter()
   const workspaceId = useWorkspaceId()
   const { mutate, isPending } = useCreateProject()

   const inputRef = useRef<HTMLInputElement>(null)

   const form = useForm<CreateProjectSchema>({
      resolver: zodResolver(createProjectSchema),
      defaultValues: {
         name: "",
         image: undefined,
         workspaceId: workspaceId
      }
   })

   const onSubmit = (data: CreateProjectSchema) => {
      const finalValues = {
         ...data,
         workspaceId,
         image: data.image instanceof File ? data.image : ""
      }

      mutate(
         { form: finalValues },
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
      <Card className="h-full w-full border-none shadow-none">
         <CardHeader className="flex p-7">
            <CardTitle className="text-xl font-bold">
               Create a new project
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
                                    placeholder="Enter project name"
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
                           Create Project
                        </Button>
                     </div>
                  </div>
               </form>
            </Form>
         </CardContent>
      </Card>
   )
}
