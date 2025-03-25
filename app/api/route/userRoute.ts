import { Router } from "express";
import UserController from "../src/controller/UserController";
import { validateDto } from "../src/middlewares/validateDto";
import UserService from "../src/services/UserService";
import { UpdateUserDto } from "../src/DTO/User.dto";
import { fileUploader } from "../src/middlewares/fileUploader";
import { handleFileUpload } from "../src/middlewares/handleFileUpload";

const userRouter = Router();
const userController = new UserController(new UserService());

userRouter.get('/public', userController.getAllPublicUsers);

userRouter.get('/current', userController.getCurentUser);

userRouter.get('/:id', userController.getUser);

userRouter.get('/', userController.getAllUsers);

userRouter.put('/update/:id', validateDto(UpdateUserDto), userController.updateUser);

userRouter.put('/update-image/:id', fileUploader.single('image'), handleFileUpload, validateDto(UpdateUserDto), userController.updateUserImage);

userRouter.delete('/delete/:id', userController.deleteUser);

export default userRouter;