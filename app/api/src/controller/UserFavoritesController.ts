import { Request, Response } from "express";
import UserFavoritesService from "../services/UserFavoritesService";
import { CustomRequest } from "../interfaces/RequestInterface";

class UserFavoritesController {
    constructor(public userFavoritesService: UserFavoritesService) {
        this.userFavoritesService = userFavoritesService;
    }

    addStoryToFavorite = async (req: CustomRequest, res: Response) => {
        const userId = req.user?.id || 0;
        const userFavorites = await this.userFavoritesService.addStoryToFavorite(userId, req.body.favoriteId);
        res.json(userFavorites);
    }

    deleteStoryToFavorite = async (req: CustomRequest, res: Response) => {
        const userId = req.user?.id || 0;
        const userFavorites = await this.userFavoritesService.deleteStoryToFavorite(userId, req.body.favoriteId);
        res.json(userFavorites);
    }

    getCurrentUserFavorites = async (req: CustomRequest, res: Response) => {
        const userId = req.user?.id || 0;
        const userFavorites = await this.userFavoritesService.getUserFavorites(userId);
        res.json(userFavorites);
    }

    getUserFavorites = async (req: Request, res: Response) => {
        const userId = parseInt(req.params.id, 10);
        const userFavorites = await this.userFavoritesService.getUserFavorites(userId);
        res.json(userFavorites);
    }
}

export default UserFavoritesController;