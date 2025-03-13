import UserFavorites from "../models/userfavorites";
import UserFavoritesService from "./UserFavoritesService";

class StoryService {
    public totalStories = 0;

    constructor(public userFavoritesService: UserFavoritesService) {
        this.userFavoritesService = new UserFavoritesService;
    }

    async getStories(
        page: number,
        limit: number,
        currentUserId: number,
        favoritePage: number,
        userId: number
    ) {
        const stories = await this.getPaginateStories(page, limit, currentUserId, favoritePage, userId);
        return {
            stories: stories,
            totalStories: this.totalStories
        }
    }

    private async fetchTopStories(){
        const response = await fetch(`${process.env.EXTERNAL_API_URL}/topstories.json`);
        return await response.json() || [];
    }

    private async getPaginateStories(
        page: number,
        limit: number,
        currentUserId: number,
        favoritePage: number,
        userId: number
    ) {
        const id = userId ? userId : currentUserId;
        const userFavorites: UserFavorites | null = await this.userFavoritesService.getUserFavorites(id);
        let favoriteIds: number[] = [];
        if (userFavorites) {
            favoriteIds = userFavorites.favoriteIds || [];
        }
        const offset = (page - 1) * limit;
        const storiesIds = favoritePage ? favoriteIds : await this.fetchTopStories();
        this.totalStories = storiesIds.length;
        const paginateIds = storiesIds.slice(offset, offset + limit);
        const paginateStories = await Promise.all(
            paginateIds.map(async (id: number) => {
                return fetch(`${process.env.EXTERNAL_API_URL}/item/${id}.json`).then(res => res.json());
            })
        );

        let currentUserFavoriteIds: number[] = favoriteIds;
        if (userId) {
            const currentUserFavorite: UserFavorites | null = await this.userFavoritesService.getUserFavorites(currentUserId);
            currentUserFavoriteIds = currentUserFavorite ? currentUserFavorite.favoriteIds || [] : [];
        }

        return paginateStories.map((story) => {
            if (currentUserFavoriteIds.includes(story.id)) {
                story.isfavorite = true;
            } else {
                story.isfavorite = false;
            }
            return story
        });
    }
}

export default StoryService;