"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { toast } from "sonner"

import { DottedSeparator } from "@/components/dotted-separator"
import { Button } from "@/components/ui/button"
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle
} from "@/components/ui/card"

import { useJoinWorkspace } from "../api/use-join-workspace"

type JoinWorkspaceFormProps = {
   initialValues: {
      name: string
   }
   inviteCode: string
   workspaceId: string
}

export const JoinWorkspaceForm = ({
   initialValues,
   inviteCode,
   workspaceId
}: JoinWorkspaceFormProps) => {
   const router = useRouter()
   const { mutate } = useJoinWorkspace()

   const onSubmit = () => {
      mutate(
         {
            json: { code: inviteCode },
            param: { workspaceId }
         },
         {
            onSuccess: ({ data }) => {
               toast.success("You have joined the workspace successfully")
               router.push(`/workspaces/${data.$id}`)
            }
         }
      )
   }

   return (
      <Card className="h-full w-full border-none shadow-none">
         <CardHeader className="p-7">
            <CardTitle className="text-xl font-bold">Join Workspace</CardTitle>
            <CardDescription>
               You&apos;ve been invited to join{" "}
               <strong>{initialValues.name}</strong> workspace.
            </CardDescription>
         </CardHeader>
         <div className="px-7">
            <DottedSeparator />
         </div>
         <CardContent className="p-7">
            <div className="flex flex-col items-center justify-between gap-2 lg:flex-row">
               <Button
                  variant="secondary"
                  type="button"
                  asChild
                  size="lg"
                  className="w-full lg:w-fit"
               >
                  <Link href="/">Cancel</Link>
               </Button>
               <Button
                  type="button"
                  size="lg"
                  className="w-full lg:w-fit"
                  onClick={onSubmit}
               >
                  Join
               </Button>
            </div>
         </CardContent>
      </Card>
   )
}
