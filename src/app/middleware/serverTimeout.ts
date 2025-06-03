import { NextFunction, Request, Response } from "express";

export default function ServerTimedOut(req: Request, res: Response, next: NextFunction) {
    if (!req.timedout) next();
}