import { Router } from "express";
import DashboardController from "../src/controller/DashboardController";
import StoryService from "../src/services/StoryService";
import UserFavoritesService from "../src/services/UserFavoritesService";

const dashboardRouter = Router()

const dashboardController = new DashboardController(new StoryService(new UserFavoritesService));

dashboardRouter.get('/', dashboardController.getStories);

export default dashboardRouter;