import { Router } from "express";
import userRouter from "./userRoute";
import userFavoritesRouter from "./userFavoritesRoute";

const protectedRouter = Router();

protectedRouter.use('/users', userRouter);
protectedRouter.use('/userfavorite', userFavoritesRouter);

export default protectedRouter;