import React from "react"
import { FolderIcon, ListCheck, UserIcon } from "lucide-react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { DatePicker } from "@/components/date-picker"
import { useMembers } from "@/features/members/api/use-members"
import { useProjects } from "@/features/projects/api/use-projects"
import { useWorkspaceId } from "@/features/workspaces/hooks/user-workspace-id"

import { TaskStatus } from "../types"
import { useTaskFilters } from "../hooks/use-task-filters"

type DataFiltersProps = {
  hideProjectFilter?: boolean
}

export const DataFilters = ({ hideProjectFilter }: DataFiltersProps) => {
  const workspaceId = useWorkspaceId()
  const { data: projects, isLoading: isLoadingProjects } = useProjects({ workspaceId })

  const { data: members, isLoading: isLoadingMembers } = useMembers({ workspaceId })

  const isLoading = isLoadingProjects || isLoadingMembers

  const projectOptions = projects?.documents.map((p) => ({ value: p.$id, label: p.name }))

  const memberOptions = members?.documents.map((m) => ({ value: m.$id, label: m.name }))

  const [{ status, assigneeId, projectId, dueDate }, setFilters] = useTaskFilters()

  const onStatusChange = (value: string) => {
    if (value === "all") {
      setFilters({ status: null })
    } else {
      setFilters({ status: value as TaskStatus })
    }
  }

  const onAssigneeChange = (value: string) => {
    setFilters({ assigneeId: value || null })
  }

  const onProjectChange = (value: string) => {
    setFilters({ projectId: value || null })
  }

  if (isLoading) return null

  return (
    <div className="flex flex-col gap-2 lg:flex-row">
      <Select defaultValue={status ?? undefined} onValueChange={(v) => onStatusChange(v)}>
        <SelectTrigger className="h-8 w-full lg:w-auto">
          <div className="flex items-center pr-2">
            <ListCheck className="mr-2 size-4" />
            <SelectValue placeholder="All statuses" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All statuses</SelectItem>
          <SelectSeparator />
          <SelectItem value={TaskStatus.BACKLOG}>Backlog</SelectItem>
          <SelectItem value={TaskStatus.TODO}>To Do</SelectItem>
          <SelectItem value={TaskStatus.IN_PROGRESS}>In Progress</SelectItem>
          <SelectItem value={TaskStatus.DONE}>Done</SelectItem>
          <SelectItem value={TaskStatus.IN_REVIEW}>In Review</SelectItem>
        </SelectContent>
      </Select>
      <Select
        defaultValue={assigneeId ?? undefined}
        onValueChange={(v) => onAssigneeChange(v)}
      >
        <SelectTrigger className="h-8 w-full lg:w-auto">
          <div className="flex items-center pr-2">
            <UserIcon className="mr-2 size-4" />
            <SelectValue placeholder="All assignees" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All assignees</SelectItem>
          <SelectSeparator />
          {memberOptions?.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        defaultValue={projectId ?? undefined}
        onValueChange={(v) => onProjectChange(v)}
      >
        <SelectTrigger className="h-8 w-full lg:w-auto">
          <div className="flex items-center pr-2">
            <FolderIcon className="mr-2 size-4" />
            <SelectValue placeholder="All projects" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All projects</SelectItem>
          <SelectSeparator />
          {projectOptions?.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <DatePicker
        placeholder="Due date"
        className="h-12 w-full lg:w-auto"
        value={dueDate ? new Date(dueDate) : undefined}
        onChange={(date) => setFilters({ dueDate: date ? date.toISOString() : null })}
      />
    </div>
  )
}
