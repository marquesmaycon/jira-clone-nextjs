"use client"

import Link from "next/link"
import React, { Fragment } from "react"
import { ArrowLeftIcon, MoreVerticalIcon } from "lucide-react"

import { useMembers } from "@/features/members/api/use-members"
import { MemberAvatar } from "@/features/members/components/member-avatar"
import { useDeleteMember } from "@/features/members/api/use-delete-member"
import { useUpdateMember } from "@/features/members/api/use-update-member"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DottedSeparator } from "@/components/dotted-separator"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

import { useWorkspaceId } from "../hooks/user-workspace-id"
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { MemberRole } from "@/features/members/types"
import { useConfirm } from "@/hooks/use-confirm"
import { useRouter } from "next/navigation"

export const MembersList = () => {
   const workspaceId = useWorkspaceId()
   const router = useRouter()

   const [ConfirmDialog, confirm] = useConfirm({
      title: "Remove member",
      message: "Are you sure you want to remove this member?",
      variant: "destructive"
   })

   const { data } = useMembers({ workspaceId })
   const { mutate: deleteMember, isPending: isDeleting } = useDeleteMember()
   const { mutate: updateMember, isPending: isUpdating } = useUpdateMember()

   const handleUpdateMember = (memberId: string, role: MemberRole) => {
      updateMember({ json: { role }, param: { memberId } })
   }

   const handleDeleteMember = async (memberId: string) => {
      const ok = await confirm()
      if (!ok) return

      deleteMember(
         { param: { memberId } },
         {
            onSuccess: () => {
               router.refresh()
            }
         }
      )
   }

   return (
      <div>
         <Card className="h-full w-full border-none shadow-none">
            <CardHeader className="flex flex-row items-center gap-x-4 p-7">
               <Button variant="secondary" size="sm">
                  <Link
                     href={`/workspaces/${workspaceId}`}
                     className="flex items-center gap-x-2"
                  >
                     <ArrowLeftIcon />
                     Back
                  </Link>
               </Button>
               <CardTitle className="text-xl font-bold">Members list</CardTitle>
            </CardHeader>
            <div className="px-7">
               <DottedSeparator />
            </div>
            <CardContent className="p-7">
               {data?.documents.map((m, i) => (
                  <Fragment key={m.$id}>
                     <div className="flex items-center gap-2">
                        <MemberAvatar
                           name={m.name}
                           className="size-10"
                           fallbackClassName="text-lg"
                        />
                        <div className="flex flex-col">
                           <p className="text-sm font-medium">{m.name}</p>
                           <p className="text-muted-foreground text-xs">
                              {m.email}
                           </p>
                        </div>
                        <DropdownMenu>
                           <DropdownMenuTrigger asChild>
                              <Button
                                 className="ml-auto"
                                 variant="secondary"
                                 size="icon"
                              >
                                 <MoreVerticalIcon className="text-muted-foreground size-4" />
                              </Button>
                           </DropdownMenuTrigger>
                           <DropdownMenuContent side="bottom" align="end">
                              <DropdownMenuItem
                                 className="font-medium"
                                 onClick={() =>
                                    handleUpdateMember(m.$id, MemberRole.ADMIN)
                                 }
                                 disabled={isUpdating}
                              >
                                 Set as Admin
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                 className="font-medium"
                                 onClick={() =>
                                    handleUpdateMember(m.$id, MemberRole.MEMBER)
                                 }
                                 disabled={isUpdating}
                              >
                                 Set as Member
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                 className="font-medium text-amber-700"
                                 onClick={() => handleDeleteMember(m.$id)}
                                 disabled={isDeleting}
                              >
                                 Remove {m.name}
                              </DropdownMenuItem>
                           </DropdownMenuContent>
                        </DropdownMenu>
                     </div>
                     {i < data.documents.length - 1 && (
                        <Separator className="my-2.5" />
                     )}
                  </Fragment>
               ))}
            </CardContent>
            <ConfirmDialog />
         </Card>
      </div>
   )
}
