import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Input } from "./ui/input";
import { sendResetPasswordRequest } from "@/services/userService";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function InputSendEmail({setOpen}: {setOpen: React.Dispatch<React.SetStateAction<boolean>>}) {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
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
        setLoading(true);
        try {
            const response = await sendResetPasswordRequest(email);
            const data = await response.json();
            if (response.ok) {
                toast.success(data.message);
                setOpen(false);
            } else {
                toast.error(data.message);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
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
                    <Button className="w-full" disabled={!email || loading}>
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> :'Send email'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}