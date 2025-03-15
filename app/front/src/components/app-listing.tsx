"use client";
import { Heart, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getStories, manageFavorite } from "@/services/favoriteService";
import { getUser } from "@/services/userService";
import { error } from "console";

type storyType = {
    by: string,
    descendants: number,
    id: number,
    kids: number[],
    score: number,
    time: number,
    title: string,
    type: string,
    url: string,
    isfavorite: boolean,
};

type userType = {
    id: number,
    username: string,
    email: string,
    age: number,
    description: string,
    image: string,
};

export function AppListing({favoritePage, userId}: {favoritePage: boolean, userId: number}) {
    const [user, setUser] = useState<userType | null>();
    const title = favoritePage ? (userId ? `List of favorites stories of ${user?.username}` : 'List of my favorites stories') : 'Hacker News - Top Stories';
    const [stories, setStories] = useState<storyType[]>([]);
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [limit, setLimit] = useState(0);
    const [totalStories, setTotalStories] = useState(0);
    const router = useRouter();
    useEffect(() => {
        setLoading(true);
        getStories(page, favoritePage, userId)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    setLoading(false);
                    router.push('/login');
                }
            })
            .then((data: {stories: storyType[], totalStories: number,limit: number}) => {
                setStories(data.stories);
                setTotalStories(data.totalStories);
                setLimit(data.limit);
                setLoading(false);
            }).catch(err => {
                setLoading(false);
                console.log('ERROR');
            });
    }, [page]);

    useEffect(() => {
        if (userId) {
            getUser(userId)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                }).then((user) => {
                    setUser(user);
                }).catch((error) => {
                    console.error(error);
                });
        }
    }, []);

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleNextPage = () => {
        setPage(page + 1);
    };

    const handleFavorite = (storyId: number, isfavorite: boolean) => {
        manageFavorite(storyId, isfavorite).then(() => {
            let newStories = [];
            if (favoritePage) {
                if (stories.length === 1 && page > 1) {
                    handlePreviousPage();
                }
                if (userId) {
                    newStories = stories.map((story) => {
                        if (story.id === storyId) {
                            story.isfavorite = !isfavorite
                        };
                        return story;
                    });
                } else {
                    newStories = stories.filter((story) => {
                        return story.id !== storyId;
                    });
                }
            } else {
                newStories = stories.map((story) => {
                    if (story.id === storyId) {
                        story.isfavorite = !isfavorite
                    };
                    return story;
                });
            }
            setStories(newStories);
        });
    };

    return (
    <div className="p-4 max-w-4xl mx-auto relative">
        <h1 className="text-xl font-bold mb-4">{title}</h1>
        <div className="space-y-4">
            {
                stories?.map(story => (
                    <Card className="p-4 flex justify-between items-center w-full" key={story.id}>
                        <CardContent className="flex-1">
                        <a href={story.url} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-blue-600 hover:underline">
                            {story.title}
                        </a>
                        <p className="text-sm text-gray-500">Par {story.by} - Score: {story.score}</p>
                        </CardContent>
                        <Button variant="ghost" onClick={() => handleFavorite(story.id, story.isfavorite)}>
                            <Heart className={`w-5 h-5 ${story.isfavorite ? 'text-red-500 fill-red-500' : 'text-gray-400'}`}/>
                        </Button>
                    </Card>
                ))
            }
        </div>
        {(totalStories > limit) && <div className="mt-4 flex justify-between">
            <Button onClick={() => handlePreviousPage()} disabled={page === 1}>Précédent</Button>
            <span>Page {page}</span>
            <Button onClick={() => handleNextPage()}>Suivant</Button>
        </div>}
        {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
                <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
            </div>
        )}
    </div>
    );
}