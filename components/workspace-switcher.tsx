"use client"

import { RiAddCircleFill } from "react-icons/ri"

import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue
} from "./ui/select"
import { useWorkspaces } from "@/features/workspaces/api/use-workspaces"
import { WorkspaceAvatar } from "@/features/workspaces/components/workspace-avatar"

export const WorkspaceSwitcher = () => {
   const { data: workspaces } = useWorkspaces()
   return (
      <div className="flex flex-col gap-y-2">
         <div className="flex items-center justify-between">
            <p className="text-xs text-neutral-500 uppercase">Workspaces</p>
            <RiAddCircleFill className="size-5 cursor-pointer text-neutral-500 transition hover:opacity-75" />
         </div>

         <Select>
            <SelectTrigger className="w-full bg-neutral-200 p-1 font-medium">
               <SelectValue placeholder="No workspace selected" />
            </SelectTrigger>
            <SelectContent>
               {workspaces?.documents.map((ws) => (
                  <SelectItem key={ws.$id} value={ws.$id}>
                     <div className="flex items-center justify-start gap-3 font-medium">
                        <WorkspaceAvatar
                           name={ws.name}
                           image={ws.imageUrl}
                           className="size-8"
                        />
                        <span className="truncate">{ws.name}</span>
                     </div>
                  </SelectItem>
               ))}
            </SelectContent>
         </Select>
      </div>
   )
}
