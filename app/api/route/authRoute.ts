import { Router } from "express";
import AuthController from "../src/controller/AuthController";
import AuthService from "../src/services/AuthService";
import { validateDto } from "../src/middlewares/validateDto";
import { CreateUserDto } from "../src/DTO/User.dto";
import { LoginDto } from "../src/DTO/Login.dto";

const authRouter = Router();

const authController = new AuthController(new AuthService);

authRouter.post('/register', validateDto(CreateUserDto), authController.register);
authRouter.post('/login', validateDto(LoginDto), authController.login);

export default authRouter;