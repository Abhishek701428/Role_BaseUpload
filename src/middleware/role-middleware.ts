import { Request, Response, NextFunction } from "express";

export const authorizationRole = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = (req as any).user
            if (!user || !roles.includes(user.role)) {
                return res.status(403).json({ message: "Access denied" })
            }
            next()
        } catch (error) {
            res.status(500).json({ message: "Server Error", error })
        }
    }
}