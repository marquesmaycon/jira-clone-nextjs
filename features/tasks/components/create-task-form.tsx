"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DottedSeparator } from "@/components/dotted-separator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

import { useWorkspaceId } from "@/features/workspaces/hooks/user-workspace-id"
import { useCreateTask } from "../api/use-create-task"
import { CreateTaskSchema, createTaskSchema } from "../schemas"

type CreateTaskFormProps = {
  onCancel?: () => void
}

export const CreateTaskForm = ({ onCancel }: CreateTaskFormProps) => {
  const router = useRouter()
  const workspaceId = useWorkspaceId()
  const { mutate, isPending } = useCreateTask()

  const form = useForm<CreateTaskSchema>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      name: "",

      workspaceId: workspaceId
    }
  })

  const onSubmit = (data: CreateTaskSchema) => {
    mutate(
      { json: data },
      {
        onSuccess: ({ data }) => {
          form.reset()
          router.push(`/workspaces/${workspaceId}/projects/${data.$id}`)
        }
      }
    )
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
                      <Input {...field} placeholder="Enter project name" />
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
