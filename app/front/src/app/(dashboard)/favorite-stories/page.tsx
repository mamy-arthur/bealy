import { AppListing } from "@/components/app-listing";

export default function FavoriteStories() {
    return (<>
        <AppListing favoritePage={true} userId={0}/>
    </>);
}