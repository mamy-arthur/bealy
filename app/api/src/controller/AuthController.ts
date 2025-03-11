import { Request, Response } from "express";
import AuthService from "../services/AuthService";

class AuthController {
    constructor(
        private authService: AuthService
    ) {}

    register = async (req: Request, res: Response) => {
        const user = await this.authService.createUser(req.body);
        res.json(user);
    }

    login = async (req: Request, res: Response) => {
        try {
            const {email, password} = req.body
            const {token, user} = await this.authService.authenticate(email, password);
            res.cookie('token', token, {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                maxAge: 3600000
            });
            res.json(user);
        } catch(err) {
            res.status(401).json({
                message: 'Invalid credential'
            });
        }
    }
}

export default AuthController;
