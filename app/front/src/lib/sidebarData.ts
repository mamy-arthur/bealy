import { FolderHeart, List, Settings, Settings2 } from "lucide-react";

export const data = {
    versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
    navMain: [
        {
            title: "News listing",
            url: "#",
            icon: Settings2,
            items: [
                {
                    title: "List of news",
                    url: "/dashboard",
                    icon: List
                },
                {
                    title: "List of favorites",
                    url: "/favorite-stories",
                    icon: FolderHeart
                },
            ],
        },
        {
            title: "User settings",
            url: "#",
            icon: Settings2,
            items: [
                {
                    title: "User profile",
                    url: "/user-profile",
                    icon: Settings
                },
            ],
        },
    ],
}