import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            error: 'Access denied, token missing'
        });
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET!);
        (req as any).user = decode;
        next();
    } catch {
        return res.status(403).json({
            error: 'Invalid token'
        });
    }
}