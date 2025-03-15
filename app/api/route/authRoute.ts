import { Router } from "express";
import AuthController from "../src/controller/AuthController";
import AuthService from "../src/services/AuthService";
import { validateDto } from "../src/middlewares/validateDto";
import { CreateUserDto, ResetPasswordDto } from "../src/DTO/User.dto";
import { LoginDto } from "../src/DTO/Login.dto";
import { authenticateToken } from "../src/middlewares/authMiddleware";
import { fileUploader } from "../src/middlewares/fileUploader";
import { handleFileUpload } from "../src/middlewares/handleFileUpload";
import { MessagingService } from "../src/services/MessagingService";

const authRouter = Router();

const authController = new AuthController(new AuthService, new MessagingService);

authRouter.post(
    '/register',
    fileUploader.single('image'),
    handleFileUpload,
    validateDto(CreateUserDto),
    authController.register
);
authRouter.post('/login', validateDto(LoginDto), authController.login);
authRouter.get('/logout', authenticateToken, authController.logout);
authRouter.post('/reset-password-request', authController.sendResetPasswordRequest);
authRouter.post('/set-new-password', validateDto(ResetPasswordDto), authController.setNewPassword);

export default authRouter;