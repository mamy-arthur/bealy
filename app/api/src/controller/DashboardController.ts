import { Request, Response } from "express";

class DashboardController {
    index(req: Request, res: Response) {
        res.json({
            message: 'TEST 1'
        });
    }

    index2(req: Request, res: Response) {
        res.json({
            message: 'TEST 2'
        });
    }
}

export default DashboardController;