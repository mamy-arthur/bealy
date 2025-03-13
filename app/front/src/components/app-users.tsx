"use client";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { getOtherUsers } from "@/services/userService";
import Link from "next/link";

const imageBaseUrl = 'http://localhost:4001/images';

type User = {
    id: number,
    username: string,
    email: string,
    image: string,
    description: string,
    age: number,
    UserFavorite: null | {
        id: number,
        favoriteIds: number[]
    }
};
export default function AppUsers() {
    const [users, setUsers] = useState<User[]>([]);
    useEffect(() => {
        getOtherUsers()
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            }).then((users) => {
                setUsers(users);
            }).catch((err) => {
                console.log(err);
            })
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {users.map((user) => (
            <Card key={user.id} className="shadow-md hover:shadow-lg transition">
                <CardHeader className="flex items-center space-x-4">
                    <Avatar className="items-center">
                        <AvatarImage src={user.image ? `${imageBaseUrl}/${user.image}` : `/images/user.png`} alt={user.username} />
                        <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div style={{marginLeft: 0}}>
                        <CardTitle className="text-center">{user.username}</CardTitle>
                        <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-gray-600">{user.description}</p>
                    <Link href={`/favorite-stories/${user.id}`}>Number of favorite ({user.UserFavorite ? user.UserFavorite.favoriteIds.length : 0})</Link>
                </CardContent>
            </Card>
        ))}
        </div>
    );
}