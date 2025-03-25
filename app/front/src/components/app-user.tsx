"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { register } from "@/services/userService";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function AppUser() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        const response = await register(formData);
        if (response.ok) {
            setLoading(false);
            router.push('/login');
        }
    };

    return (
        <Card className="mx-auto mt-10 mx-40 p-6 shadow-lg">
            <CardHeader className="items-center">
                <CardTitle>Create user</CardTitle>
            </CardHeader>
            <CardContent>
                <form className="grid grid-cols-2 gap-8" onSubmit={(e) => handleSubmit(e)}>
                    <div className="space-y-4 flex flex-col gap-2">
                        <div className="grid gap-2">
                            <Label htmlFor="username">Username</Label>
                            <Input id="username" type="text" name="username" placeholder="Enter your username" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" name="email" placeholder="Enter your email" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" name="password" placeholder="Enter your password" />
                        </div>
                    </div>

                    <div className="space-y-4 flex flex-col gap-2">
                        <div className="grid gap-2">
                            <Label htmlFor="age">Age</Label>
                            <Input id="age" type="number" name="age" placeholder="Enter your age" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" name="description" placeholder="Enter a description" rows={5}/>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="image">Image URL</Label>
                            <Input id="image" type="file" name="image" placeholder="Enter image URL"/>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="ispublic" name="ispublic"/>
                            <Label htmlFor="ispublic">Make profile public</Label>
                        </div>
                    </div>
                    <div className="col-span-2">
                        <Button type="submit" className="w-full">
                            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Create User'}
                        </Button>
                    </div>
                </form>
                <div className="mt-4 text-center">
                    <span className="text-sm text-gray-600">Already have an account? </span>
                    <Link href="/login" className="underline underline-offset-4">
                        Login here
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}