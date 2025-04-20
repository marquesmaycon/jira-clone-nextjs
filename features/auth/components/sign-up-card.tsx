"use client"

import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { DottedSeparator } from "@/components/dotted-separator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { signUpSchema, SignUpSchema } from "@/features/auth/schemas"
import { useRegister } from "@/features/auth/api/use-register"

export const SignUpCard = () => {
   const { mutate: register } = useRegister()

   const form = useForm<SignUpSchema>({
      resolver: zodResolver(signUpSchema),
      defaultValues: {
         name: "",
         email: "",
         password: ""
      }
   })

   const onSubmit = async (data: SignUpSchema) => {
      register({ json: data })
   }

   return (
      <Card className="w-full h-full md:w-[487px] border-none shadow-none">
         <CardHeader className="text-center p-7">
            <CardTitle className="text-2xl">Sign Up</CardTitle>
            <CardDescription>
               By signing up, you agree to our{" "}
               <Link href="/privacy" className="text-primary">
                  Privacy Policy
               </Link>
               and
               <Link href="/terms" className="text-primary">
                  Terms of Service
               </Link>
            </CardDescription>
         </CardHeader>
         <div className="px-7">
            <DottedSeparator />
         </div>
         <CardContent className="p-7">
            <Form {...form}>
               <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                     control={form.control}
                     name="name"
                     render={({ field }) => (
                        <FormItem>
                           <FormControl>
                              <Input {...field} placeholder="Enter your name" />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="email"
                     render={({ field }) => (
                        <FormItem>
                           <FormControl>
                              <Input {...field} placeholder="Enter e-mail" />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="password"
                     render={({ field }) => (
                        <FormItem>
                           <FormControl>
                              <Input {...field} type="password" placeholder="Enter password" />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <Button type="submit" size="lg" className="w-full">
                     Register
                  </Button>
               </form>
            </Form>
         </CardContent>
         <div className="px-7">
            <DottedSeparator />
         </div>
         <CardContent className="p-7 flex flex-col gap-y-5">
            <Button variant="secondary" size="lg" className="w-full">
               <FcGoogle className="mr-2 size-5" />
               Login with Google
            </Button>
            <Button variant="secondary" size="lg" className="w-full">
               <FaGithub className="mr-2 size-5" />
               Sign in with GitHub
            </Button>
         </CardContent>
         <div className="px-7">
            <DottedSeparator />
         </div>
         <CardContent className="p-7 text-center">
            <p>
               Already have an account?&nbsp;
               <Link href="/sign-in" className="text-blue-700">
                  Sign In
               </Link>
            </p>
         </CardContent>
      </Card>
   )
}
