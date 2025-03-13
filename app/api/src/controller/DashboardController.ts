import { Request, Response } from "express";
import StoryService from "../services/StoryService";
import { CustomRequest } from "../interfaces/RequestInterface";

class DashboardController {
    limit = 10;

    constructor(public storyService: StoryService) {
        this.storyService = storyService;
    }

    getStories = async (req: CustomRequest, res: Response) => {
        const page: number = parseInt(req.query.page as string, 10) || 1;
        if (isNaN(page) || page < 1) {
            res.status(400).json({
                error: "The 'page' parameter must be a positive integer."
            });
        }
        const currentUserId = req.user?.id || 0;
        let userId = 0;
        if (req.query.userId !== undefined) {
            userId = parseInt(req.query.userId as string, 10);
        };
        const stories =  await this.storyService.getStories(page, this.limit, currentUserId, parseInt(req.query.favoritePage as string, 10), userId);
        res.json({
            ...stories,
            limit: this.limit
        });
    }
}

export default DashboardController;