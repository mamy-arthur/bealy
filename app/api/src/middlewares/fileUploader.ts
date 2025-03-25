import { Request } from "express";
import fs from "fs";
import path from "path";
import multer from "multer";

const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: (a: any, uploadDir: string) => void) => {
        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req: Request, file: Express.Multer.File, cb: (a: any, uploadDir: string) => void) => {
        const cleanedFileName = file.originalname.replace(/[^a-zA-Z0-9.]/g, '-');
        const newFileName = Date.now() + '-' + cleanedFileName;
        cb(null, newFileName);
    },
});

export const fileUploader = multer({ storage });