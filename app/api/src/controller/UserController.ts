import { Request, Response } from "express";
import UserService from "../services/UserService";
import { CustomRequest } from "../interfaces/RequestInterface";

class UsersController {
    constructor(public userService: UserService) {
        this.userService = userService;
    }

    getAllPublicUsers = async (req: CustomRequest, res: Response) => {
        const userId: number = req.user?.id || 0;
        const users = await this.userService.getAllPublicUsers(userId);
        res.json(users);
    }

    getUser = async (req: Request, res: Response) => {
        const user = await this.userService.getUser(parseInt(req.params.id, 10));
        res.json(user);
    }

    getCurentUser = async(req: CustomRequest, res: Response) => {
        const userId = req.user?.id || 0
        const user = await this.userService.getUser(userId);
        res.json(user);
    }

    updateUser = async (req: Request, res: Response) => {
        const user = await this.userService.updateUser(req.body, parseInt(req.params.id, 10));
        if (!user) {
            return res.status(404).json({message: 'User not found!'});
        }
        res.json(user);
    }

    getAllUsers = async (req: Request, res: Response) => {
        const users = await this.userService.getAllUsers();
        res.json(users);
    }

    deleteUser = async (req: Request, res: Response) => {
        await this.userService.deleteUser(parseInt(req.params.id, 10));
        res.json({
            status: 'success',
            message: 'user deleted'
        });
    }

    updateUserImage = async (req: Request, res: Response) => {
        const data = {
            image: req.body.image
        };
        const user = await this.userService.updateUser(data, parseInt(req.params.id, 10));
        if (!user) {
            return res.status(404).json({message: 'User not found!'});
        }
        res.json(user);
    }
}

export default UsersController;