import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Input } from "./ui/input";
import { sendResetPasswordRequest } from "@/services/userService";

export default function InputSendEmail({open, setOpen}: {open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>}) {
    const [email, setEmail] = useState('');
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setEmail(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (!email) {
            return;
        }
        await sendResetPasswordRequest(email);
    }

    return (
        <Card className="mt-2 border-0 shadow-none">
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="grid w-full items-center gap-4 mb-4">
                        <div className="flex flex-col space-y-1.5">
                            <Input id="email" type="email" placeholder="email@example.com" onChange={handleChange} />
                        </div>
                    </div>
                    <Button className="w-full" disabled={!email}>Send email</Button>
                </form>
            </CardContent>
        </Card>
    );
}