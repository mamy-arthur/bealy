import { Router } from "express";
import UserController from "../src/controller/UserController";
import { validateDto } from "../src/middlewares/validateDto";
import UserService from "../src/services/UserService";
import { UpdateUserDto } from "../src/DTO/User.dto";

const userRouter = Router();
const userController = new UserController(new UserService());

userRouter.get('/public', userController.getAllPublicUsers);

userRouter.get('/current', userController.getCurentUser);

userRouter.get('/:id', userController.getUser);

userRouter.get('/', userController.getAllUsers);

userRouter.put('/update/:id', validateDto(UpdateUserDto), userController.updateUser);

userRouter.delete('/delete/:id', userController.deleteUser);

export default userRouter;