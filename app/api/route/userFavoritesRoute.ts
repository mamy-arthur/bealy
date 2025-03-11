import { Router } from "express";
import UserFavoritesController from "../src/controller/UserFavoritesController";
import { validateDto } from "../src/middlewares/validateDto";
import { UserFavoritesDto } from "../src/DTO/UserFavorites.dto";
import UserFavoritesService from "../src/services/UserFavoritesService";

const userFavoritesRouter = Router();

const userFavoritesController = new UserFavoritesController(new UserFavoritesService());

userFavoritesRouter.get('/:id', userFavoritesController.getUserFavorites);
userFavoritesRouter.post('/add', validateDto(UserFavoritesDto), userFavoritesController.addStoryToFavorite);
userFavoritesRouter.post('/delete', validateDto(UserFavoritesDto), userFavoritesController.deleteStoryToFavorite);
userFavoritesRouter.get('/', userFavoritesController.getCurrentUserFavorites);

export default userFavoritesRouter;