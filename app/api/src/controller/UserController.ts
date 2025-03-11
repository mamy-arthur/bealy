import { Request, Response } from "express";
import UserService from "../services/UserService";
import { CustomRequest } from "../interfaces/RequestInterface";

class UsersController {
    constructor(public userService: UserService) {
        this.userService = userService;
    }

    getAllPublicUsers = async (req: Request, res: Response) => {
        const users = await this.userService.getAllPublicUsers();
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
}

export default UsersController;