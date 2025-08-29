import { useCallback, useEffect, useState } from "react"
import { DragDropContext, Draggable, Droppable, DropResult } from "@hello-pangea/dnd"

import { Task, TaskStatus } from "../types"
import { KanbanColumnHeader } from "./kanban-column-header"
import { KanbanCard } from "./kanban-card"

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
  onChange: (tasks: Pick<Task, "$id" | "status" | "position">[]) => void
}

const prepareTasksState = (data: Task[]) =>
  Object.values(TaskStatus).reduce((acc, status) => {
    acc[status] = data
      .filter((task) => task.status === status)
      .sort((a, b) => a.position - b.position)
    return acc
  }, {} as TasksState)

export const DataKanban = ({ data, onChange }: DataKanbanProps) => {
  const [tasks, setTasks] = useState<TasksState>(prepareTasksState(data))

  useEffect(() => {
    setTasks(prepareTasksState(data))
  }, [data])

  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) return
      const { source, destination } = result
      const sourceStatus = source.droppableId as TaskStatus
      const destStatus = destination.droppableId as TaskStatus
      const updatesPayload: { $id: string; status: TaskStatus; position: number }[] = []

      setTasks((prev) => {
        const newTasks = { ...prev }

        const sourceColumn = [...newTasks[sourceStatus]]
        const [movedTask] = sourceColumn.splice(source.index, 1)

        if (!movedTask) {
          console.log("No task found at the source index")
          return prev
        }

        const updatedMovedTask =
          sourceStatus !== destStatus ? { ...movedTask, status: destStatus } : movedTask

        newTasks[sourceStatus] = sourceColumn

        const destColumn = [...newTasks[destStatus]]
        destColumn.splice(destination.index, 0, updatedMovedTask)
        newTasks[destStatus] = destColumn

        updatesPayload.push({
          $id: updatedMovedTask.$id,
          status: updatedMovedTask.status,
          position: Math.min((destination.index + 1) * 1000, 1_000_000)
        })

        newTasks[destStatus].forEach((task, idx) => {
          if (task && task.$id !== updatedMovedTask.$id) {
            const newPosition = Math.min((idx + 1) * 1000, 1_000_000)
            updatesPayload.push({
              $id: task.$id,
              status: destStatus,
              position: newPosition
            })
          }
        })

        if (sourceStatus !== destStatus) {
          newTasks[sourceStatus].forEach((task, idx) => {
            if (task) {
              const newPosition = Math.min((idx + 1) * 1000, 1_000_000)
              updatesPayload.push({
                $id: task.$id,
                status: sourceStatus,
                position: newPosition
              })
            }
          })
        }

        return newTasks
      })

      onChange(updatesPayload)
    },
    [onChange]
  )

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex overflow-x-auto">
        {boards.map((board) => (
          <div
            key={board}
            className="bg-muted mx-2 min-w-[200px] flex-1 rounded-md p-1.5"
          >
            <KanbanColumnHeader
              key={board}
              board={board}
              taskCount={tasks[board].length}
            />
            <Droppable droppableId={board}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="min-h-[200px] py-1.5"
                >
                  {tasks[board].map((task, idx) => (
                    <Draggable key={task.$id} draggableId={task.$id} index={idx}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <KanbanCard task={task} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  )
}
