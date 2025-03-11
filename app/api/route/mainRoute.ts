import { Router } from "express";
import authRouter from "./authRoute";
import { authenticateToken } from "../src/middlewares/authMiddleware";
import protectedRouter from "./protectedRoute";

const mainRouter = Router()

mainRouter.use('/', authRouter);
mainRouter.use('/', authenticateToken, protectedRouter);

mainRouter.get('*', function(req, res) {
    res.json({
        status: 404,
        message: 'Page not found'
    });
})

export default mainRouter;