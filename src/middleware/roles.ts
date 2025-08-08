import { Request, Response, NextFunction } from "express";

export function authorizeRole(role: string) {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = (req as any).user;
        if (!user || user.role !== role) {
            return res.sendStatus(403); // Forbidden
        }
        next();
    };
}
