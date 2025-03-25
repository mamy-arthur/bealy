"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { setNewPassword } from "@/services/userService";
import { toast } from "sonner";
import { Loader2, XCircle } from "lucide-react";
import Link from "next/link";

export default function AppResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("The passwords do not match.", {
        icon: <XCircle className="text-red-500" />,
        duration: 4000,
        style: { backgroundColor: "#fee2e2", color: "#b91c1c" }
      });
      return;
    }

    const token: string = params.token.toString();
    setLoading(true);
    try {
      const response = await setNewPassword(token, password);
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        router.push('/login');
      } else {
        toast.error(data.message);
      }
      setLoading(false);
    } catch(error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader>
          <CardTitle className="text-center text-xl">Set a new password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium">New password</label>
              <Input
                id="password"
                type="password"
                placeholder="your new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium">Confirm password</label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirmez votre mot de passe"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Reset'}
            </Button>
            <div className="mt-4 text-center text-sm">
              <Link href="/login" className="text-sm underline underline-offset-4">
                Go to login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
