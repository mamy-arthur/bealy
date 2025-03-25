import { Request, Response } from "express";
import AuthService from "../services/AuthService";
import { MessagingService } from "../services/MessagingService";
import User from "../models/user";

class AuthController {
    constructor(
        private authService: AuthService,
        private messagingService: MessagingService
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

    logout = async (req: Request, res: Response) => {
        res.clearCookie('token');
        res.json({
            message: 'User deconnected!'
        });
    }

    sendResetPasswordRequest = async (req: Request, res: Response) => {
        const user: User | null = await this.authService.getUserByMail(req.body.email);
        if (!user) {
            return res.status(400).json({
                message: 'Email not found!'
            });
        }
        const token = await this.authService.generateAndSaveToken(req.body.email, user);
        const url = `${process.env.FRONT_BASE_URL}/reset-password/${token}`;
        const message = req.body.message.replace('{{username}}', user.username).replace('{{url}}', url);
        try {
            await this.messagingService.sendEmail(user.email, message);
            return res.json({
                message: 'Email sent'
            });
        } catch(error) {
            res.status(500).json({
                message: 'Error sending email'
            });
        }
    }

    setNewPassword = async (req: Request, res: Response) => {
        const user: User | null = await this.authService.getUserByToken(req.body.token);
        if (!user) {
            res.status(400).json({
                message: 'There is no matching user'
            });
        } else {
            await this.authService.setUserNewPassword(user, req.body.password);
            res.json({
                message: 'Your password has been successfully reset.'
            })
        }
    }
}

export default AuthController;
