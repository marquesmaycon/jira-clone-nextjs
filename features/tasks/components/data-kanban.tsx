import React, { useState } from "react"
import { DragDropContext } from "@hello-pangea/dnd"

import { Task, TaskStatus } from "../types"
import { KanbanColumnHeader } from "./kanban-column-header"

const boards: TaskStatus[] = [
  TaskStatus.BACKLOG,
  TaskStatus.TODO,
  TaskStatus.IN_PROGRESS,
  TaskStatus.IN_REVIEW,
  TaskStatus.DONE
]

type TasksState = {
  [key in TaskStatus]: Task[]
}

type DataKanbanProps = {
  data: Task[]
}

export const DataKanban = ({ data }: DataKanbanProps) => {
  const [task, setTasks] = useState<TasksState>(() => {
    return Object.values(TaskStatus).reduce((acc, status) => {
      acc[status] = data
        .filter((task) => task.status === status)
        .sort((a, b) => a.position - b.position)
      return acc
    }, {} as TasksState)
  })
  return (
    <DragDropContext onDragEnd={() => {}}>
      <div className="flex overflow-x-auto">
        {boards.map((board) => {
          return (
            <div
              key={board}
              className="bg-muted mx-2 min-w-[200px] flex-1 rounded-md p-1.5"
            >
              <KanbanColumnHeader
                key={board}
                board={board}
                taskCount={task[board].length}
              />
            </div>
          )
        })}
      </div>
    </DragDropContext>
  )
}
