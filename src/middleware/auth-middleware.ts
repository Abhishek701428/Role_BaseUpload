import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../modules/auth/user-model";

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        if (!token) return res.status(401).send({ error: 'Access Denied' });

        const decoded: any = jwt.verify(token, process.env.AUTH_SECRET_KEY);
        const user = await User.findById(decoded.id);
        if (!user) return res.status(404).send({ error: 'User Not Found' })
        if (!user) {
            throw new Error();
        }
        (req as any).user = user
        next();
    } catch (error) {
        res.status(401).send({ message: 'Please authenticate.' });
    }
}
