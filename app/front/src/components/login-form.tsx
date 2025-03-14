"use client";

import type React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { login } from "@/services/userService";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import InputSendEmail from "./input-send-email";

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const {user, logout} = useAuth();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  if (user) {
    router.push('/dashboard');
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data: any = Object.fromEntries(formData);
    const response = await login(data);
    if (response.ok) {
      setLoading(false);
      router.push('/dashboard');
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" name="email" required />
              </div>
              <div className="grid gap-2">
                <div className="flex justify-between">
                  <div>
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <div>
                    <Dialog open={open}>
                      <DialogTrigger className="text-right">
                        <span className="text-sm underline underline-offset-4">Forgot your password?</span>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Reset password</DialogTitle>
                        </DialogHeader>
                        <InputSendEmail open={open} setOpen={setOpen}/>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
                <Input id="password" type="password" name="password" required />
              </div>
              <Button type="submit" className="w-full">
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Login'}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
