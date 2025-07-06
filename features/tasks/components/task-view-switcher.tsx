"use client"

import { useQueryState } from "nuqs"
import { Loader, Plus } from "lucide-react"

import { useWorkspaceId } from "@/features/workspaces/hooks/user-workspace-id"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { DottedSeparator } from "@/components/dotted-separator"

import { useCreateTaskModal } from "../hooks/use-create-task-modal"
import { useTasks } from "../api/use-task"
import { DataFilters } from "./data-filters"
import { useTaskFilters } from "../hooks/use-task-filters"
import { DataTable } from "./data-table"
import { columns } from "./colums"

export const TaskViewSwitcher = () => {
  const [{ status, assigneeId, projectId, dueDate }] = useTaskFilters()
  const [view, setView] = useQueryState("task-view", { defaultValue: "table" })
  const workspaceId = useWorkspaceId()
  const { data: tasks, isLoading } = useTasks({
    workspaceId,
    projectId,
    assigneeId,
    status,
    dueDate
  })
  const { open } = useCreateTaskModal()

  return (
    <Tabs
      value={view}
      onValueChange={setView}
      className="w-full flex-1 rounded-lg border"
    >
      <div className="flex h-full flex-col overflow-auto p-4">
        <div className="items center flex flex-col justify-between gap-y-2 lg:flex-row">
          <TabsList className="w-full lg:w-auto">
            <TabsTrigger className="h-8 w-full lg:w-auto" value="table">
              Table
            </TabsTrigger>
            <TabsTrigger className="h-8 w-full lg:w-auto" value="kanban">
              Kanban
            </TabsTrigger>
            <TabsTrigger className="h-8 w-full lg:w-auto" value="calendar">
              Calendar
            </TabsTrigger>
          </TabsList>
          <Button size="sm" className="w-full lg:w-auto" onClick={open}>
            <Plus className="mr-2 size-4" /> New
          </Button>
        </div>
        <DottedSeparator className="my-4" />
        <DataFilters />
        <DottedSeparator className="my-4" />
        {isLoading ? (
          <div className="flex h-[200px] w-full flex-col items-center justify-center rounded-lg border">
            <Loader className="text-muted-foreground size-5 animate-spin" />
          </div>
        ) : (
          <>
            <TabsContent value="table" className="mt-0">
              <DataTable columns={columns} data={tasks?.documents ?? []} />
            </TabsContent>
            <TabsContent value="kanban" className="mt-0">
              {JSON.stringify(tasks, null, 2)}
            </TabsContent>
            <TabsContent value="calendar" className="mt-0">
              {JSON.stringify(tasks, null, 2)}
            </TabsContent>
          </>
        )}
      </div>
    </Tabs>
  )
}
