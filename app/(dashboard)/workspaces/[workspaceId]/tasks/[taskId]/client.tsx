"use client"

import { DottedSeparator } from "@/components/dotted-separator"
import { PageError } from "@/components/page-error"
import { PageLoader } from "@/components/page-loader"
import { useTask } from "@/features/tasks/api/use-task"
import { TaskBreadcrumbs } from "@/features/tasks/components/task-breadcrumbs"
import { TaskDescription } from "@/features/tasks/components/task-description"
import { TaskOverview } from "@/features/tasks/components/task-overview"
import { useTaskId } from "@/features/tasks/hooks/use-task-id"

export function TaskIdClient() {
  const taskId = useTaskId()
  const { data: task, isLoading } = useTask({ taskId })

  if (isLoading) {
    return <PageLoader />
  }

  if (!task) {
    return <PageError message="Task not found." />
  }

  return (
    <div className="flex flex-col">
      <TaskBreadcrumbs task={task} project={task.project} />
      <DottedSeparator className="my-6" />
      <div className="grid gap-4 lg:grid-cols-2">
        <TaskOverview task={task} />
        <TaskDescription task={task} />
      </div>
    </div>
  )
}
