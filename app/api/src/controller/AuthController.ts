import { Request, Response } from "express";
import AuthService from "../services/AuthService";
import { MessagingService } from "../services/MessagingService";

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

    logout = async (req: Request, res: Response) => {
        res.clearCookie('token');
        res.json({
            message: 'User deconnected!'
        });
    }

    sendResetPasswordRequest = async (req: Request, res: Response) => {
        //const transporter = MessagingService.getTransporter();
        const user = await this.authService.getUserByMail(req.body.email);
        if (!user) {
            return res.status(400).json({ message: "Email not found!" });
        }
        
        // try {
        //     const user = await this.authService.getUserByMail(req.body.email);
        // } catch(error) {
        //     res.status(400).json({ message: "Email not found!", error });
        // }
        res.json(user);
        // try {
        //     // const info = await transporter.sendMail({
        //     //     from: process.env.EMAIL_USER,
        //     //     to: 'mamyarthurr@gmail.com',
        //     //     subject: 'TEST',
        //     //     html: `<div>TATATTTAT</div>`
        //     // });
        //     console.log(req.body);
        //     return res.json({ message: 'Email sent' });
        // } catch(error) {
        //     res.status(500).json({ message: "Erreur lors de l'envoi de l'email", error });
        // }
    }
}

export default AuthController;
