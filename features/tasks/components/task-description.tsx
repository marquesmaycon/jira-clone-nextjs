import { Pencil, X } from "lucide-react"
import { useState } from "react"

import { DottedSeparator } from "@/components/dotted-separator"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

import { useUpdateTask } from "../api/use-update-task"
import type { Task } from "../types"

type TaskDescriptionProps = {
  task: Task
}
export const TaskDescription = ({ task }: TaskDescriptionProps) => {
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState(task.description || "")

  const { mutateAsync: updateTask, isPending } = useUpdateTask()

  const handleSave = async () => {
    await updateTask({ json: { description: value }, param: { taskId: task.$id } })
  }

  const Icon = editing ? X : Pencil

  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold">Overview</p>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => setEditing((p) => !p)}
          disabled={isPending}
        >
          <Icon className="mr-2 size-4" />
          {editing ? "Cancel" : "Edit"}
        </Button>
      </div>
      <DottedSeparator className="my-4" />
      {editing ? (
        <div className="flex flex-col gap-y-4">
          <Textarea
            placeholder="Add a description..."
            value={value}
            rows={4}
            onChange={(e) => setValue(e.target.value)}
            disabled={isPending}
          />
          <Button size="sm" className="ml-auto w-fit" onClick={handleSave}>
            {isPending ? "Saving..." : "Save"}
          </Button>
        </div>
      ) : (
        <div className="">
          {task.description || (
            <span className="text-muted-foreground">No description provided.</span>
          )}
        </div>
      )}
    </div>
  )
}
