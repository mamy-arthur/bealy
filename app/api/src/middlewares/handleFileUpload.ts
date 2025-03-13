import { NextFunction, Request, Response } from "express";

export const handleFileUpload = (req: Request, res: Response, next: NextFunction) => {
    req.body.age = parseInt(req.body.age, 10) || 0;
    if (!req.file) {
        return next();
    }
    req.body.image = req.file.filename;

    next();
};