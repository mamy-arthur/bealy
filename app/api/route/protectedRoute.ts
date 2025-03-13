import { Router } from "express";
import userRouter from "./userRoute";
import userFavoritesRouter from "./userFavoritesRoute";
import dashboardRouter from "./dashboardRoute";

const protectedRouter = Router();

protectedRouter.use('/stories', dashboardRouter);
protectedRouter.use('/users', userRouter);
protectedRouter.use('/userfavorite', userFavoritesRouter);

export default protectedRouter;