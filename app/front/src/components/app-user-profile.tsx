"use client";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { getCurrentUser, logoutApi, register, updateUser, updateUserImage } from "@/services/userService";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Loader2, Pencil, Save } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

type userType = {
    id: number,
    email: string,
    username: string,
    age: number,
    description: string,
    ispublic: boolean,
    image: string,
}

const imageBaseUrl = 'http://localhost:4001/images';

export default function AppUserProfile() {
    const [user, setUser] = useState<userType>();
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [pwd, setPwd] = useState<string>('');
    const [age, setAge] = useState<number>(0);
    const [description, setDescription] = useState<string>('');
    const [ispublic, setIspublic] = useState<boolean>(false);
    const [image, setImage] = useState("/images/user.png");
    const [previewImage, setPreviewImage] = useState(image);
    const [file, setFile] = useState<any>();
    const [saveImage, setSaveImage] = useState(false);
    const [data, setData] = useState<any>({});
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        await updateUser(data, user?.id || 0)
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
            }).then((user) => {
                setUser(user);
                setUsername(user?.username);
                setEmail(user?.email);
                setAge(user?.age);
                setDescription(user?.description);
                setIspublic(user?.ispublic);
                if (user?.image) {
                    setPreviewImage(`${imageBaseUrl}/${user?.image}`);
                }
                setData({});
            }).catch((error) => {
                setLoading(false);
                console.log(error)
            });
    };

    useEffect(() => {
        getCurrentUser()
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw Error();
                }
            }).then((user) => {
                setUser(user);
                setUsername(user?.username);
                setEmail(user?.email);
                setAge(user?.age);
                setDescription(user?.description);
                setIspublic(user?.ispublic);
                if (user?.image) {
                    setPreviewImage(`${imageBaseUrl}/${user?.image}`);
                }
            }).catch((error) => {
                logoutApi().then(() => {
                    router.push('/login');
                });
            });
    }, []);

    const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
        setData({
            ...data,
            username: e.target.value
        });
    };

    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setData({
            ...data,
            email: e.target.value
        });
    };

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPwd(e.target.value);
        setData({
            ...data,
            password: e.target.value
        });
    };

    const handleAge = (e: React.ChangeEvent<HTMLInputElement>) => {
        let age = e.target.value;
        if (isNaN(parseInt(age, 10))) {
            age = '0';
        }
        setAge(parseInt(age, 10));
        setData({
            ...data,
            age: parseInt(age, 10)
        });
    };

    const handleDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
        setData({
            ...data,
            description: e.target.value
        });
    };

    const handleIspublic = (checked: boolean) => {
        setIspublic(checked);
        setData({
            ...data,
            ispublic: checked
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            const newImage = URL.createObjectURL(e.target.files[0]);
            setFile(e.target.files[0]);
            setImage(newImage);
            setPreviewImage(newImage);
            setSaveImage(true);
        }
    };

    const updateUserAvatar = async (e: any) => {
        e.preventDefault();
        const formData = new FormData;
        formData.append('image', file);
        updateUserImage(formData, user?.id || 0)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((user) => {
                setUser(user);
                setUsername(user?.username);
                setEmail(user?.email);
                setAge(user?.age);
                setDescription(user?.description);
                setIspublic(user?.ispublic);
                if (user?.image) {
                    setPreviewImage(`${imageBaseUrl}/${user?.image}`);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <Card className="mx-auto mt-10 mx-40 p-6 shadow-lg">
            <CardHeader className="items-center">
                <CardTitle className="mb-4">Edit user</CardTitle>
                <Dialog>
                    <DialogTrigger>
                        <Avatar className="cursor-pointer">
                            <AvatarImage src={user?.image ? `${imageBaseUrl}/${user?.image}` : `/images/user.png`} alt={user?.username} />
                        </Avatar>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle></DialogTitle>
                            <div className="bg-white p-4 rounded-lg flex flex-col items-center space-y-4">
                                <img src={previewImage} alt="preview" className="w-80 h-80 object-cover rounded-lg" />
                                <div className="flex space-x-4">
                                        <div className="flex-1 p-4 rounded-lg"><label htmlFor="fileupload" className="relative cursor-pointer">
                                                <Pencil className="w-5 h-5" />
                                                <input id="fileupload" name="image" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                                            </label>
                                        </div>
                                        {saveImage && <div className="flex-1 p-4 rounded-lg cursor-pointer" onClick={updateUserAvatar}>
                                            <Save className="w-5 h-5" />
                                        </div>}
                                </div>
                            </div>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </CardHeader>
            <CardContent>
                <form className="grid grid-cols-2 gap-8" onSubmit={(e) => handleSubmit(e)}>
                    <div className="space-y-4 flex flex-col gap-2">
                        <div className="grid gap-2">
                            <Label htmlFor="username">Username</Label>
                            <Input id="username" type="text" onChange={handleUsername} name="username" value={username} placeholder="Enter your username" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" onChange={handleEmail} name="email" value={email} placeholder="Enter your email" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" name="password" onChange={handlePassword} value={pwd} placeholder="Enter your password" />
                        </div>
                    </div>

                    <div className="space-y-4 flex flex-col gap-2">
                        <div className="grid gap-2">
                            <Label htmlFor="age">Age</Label>
                            <Input id="age" type="number" onChange={handleAge} name="age" value={age} placeholder="Enter your age" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" onChange={handleDescription} name="description" value={description} placeholder="Enter a description" rows={5}/>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="ispublic" name="ispublic" onCheckedChange={handleIspublic} checked={ispublic}/>
                            <Label htmlFor="ispublic">Make profile public</Label>
                        </div>
                    </div>
                    <div className="col-span-2">
                        <Button type="submit" className="w-full">
                            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Update User'}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}