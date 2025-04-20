"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { CreateWorkspaceSchema, createWorkspaceSchema } from "../schemas"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DottedSeparator } from "@/components/dotted-separator"
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useCreateWorkspace } from "../api/use-create-workspace"

type CreateWorkspaceFormProps = {
   onCancel?: () => void
}

export const CreateWorkspaceForm = ({ onCancel }: CreateWorkspaceFormProps) => {
   const { mutate, isPending } = useCreateWorkspace()

   const form = useForm<CreateWorkspaceSchema>({
      resolver: zodResolver(createWorkspaceSchema),
      defaultValues: {
         name: ""
      }
   })
   const onSubmit = (data: CreateWorkspaceSchema) => {
      mutate({ json: data })
   }

   return (
      <Card className="h-full w-full border-none shadow-none">
         <CardHeader className="flex p-7">
            <CardTitle className="text-xl font-bold">
               Create a new workspace
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
                              <FormLabel>Workspace Name</FormLabel>
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
                     <DottedSeparator className="py-7" />
                     <div className="flex items-center justify-between">
                        <Button
                           type="button"
                           size="lg"
                           variant="secondary"
                           disabled={isPending}
                        >
                           Cancel
                        </Button>

                        <Button type="submit" size="lg" disabled={isPending}>
                           Create Workspace
                        </Button>
                     </div>
                  </div>
               </form>
            </Form>
         </CardContent>
      </Card>
   )
}
