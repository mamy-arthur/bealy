"use client";
import { AppListing } from "@/components/app-listing";
import { useParams } from "next/navigation";

export default function OtherUserFavorite() {
    const params = useParams();
    return (
        <AppListing favoritePage={true} userId={parseInt(params.id as string, 10)}/>
    );
}