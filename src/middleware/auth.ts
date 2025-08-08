import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        (req as any).user = user;
        next();
    });
}
