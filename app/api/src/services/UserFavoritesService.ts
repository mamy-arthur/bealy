import UserFavorites from "../models/userfavorites";

class UserFavoritesService {
    async addStoryToFavorite(userId: number, favoriteId: number) {
        const userFavorites = await UserFavorites.findOne({
            where: {
                userId: userId
            }
        });
        if (userFavorites) {
            let favoriteIds = userFavorites.dataValues.favoriteIds || [];
            if (favoriteIds?.includes(favoriteId)) {
                return userFavorites;
            } else {
                favoriteIds = [
                    ...favoriteIds,
                    favoriteId
                ];
                const userFavoritesData = {
                    userId: userId,
                    favoriteIds: favoriteIds
                };
                return await UserFavorites.update(userFavoritesData, {
                    where: {
                        userId: userId
                    }
                });
            }
        } else {
            const userFavoritesData = {
                userId: userId,
                favoriteIds: [favoriteId]
            }
            return await UserFavorites.create(userFavoritesData);
        }
    }

    async deleteStoryToFavorite(userId: number, favoriteId: number) {
        const userFavorites = await UserFavorites.findOne({
            where: {
                userId: userId
            }
        });
        if (userFavorites) {
            let favoriteIds = userFavorites.dataValues.favoriteIds || [];
            if (favoriteIds?.includes(favoriteId)) {
                favoriteIds = favoriteIds.filter((id) => {
                    return id !== favoriteId
                });
                const userFavoritesData = {
                    userId: userId,
                    favoriteIds: favoriteIds
                };
                UserFavorites.update(userFavoritesData, {
                    where: {
                        userId: userId
                    }
                });
            } else {
                return userFavorites;
            }
        } else {
            return null;
        }
    }

    async getUserFavorites(userId: number) {
        return UserFavorites.findOne({
            where: {
                userId: userId
            }
        });
    }
}

export default UserFavoritesService;