import { Request, Response } from "express";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from "../auth/user-model";

export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password, role } = req.body
        if (!["A", "B"].includes(role)) return res.status(400).json({ message: "Invalid role" })
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({ name, email, password: hashedPassword, role })
        await user.save()
        res.status(201).json({ message: "User created successfully", user })
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error })
    }

}
export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) return res.status(400).json({ message: "Invalid email or password" })
        const isValid = await bcrypt.compare(password, user.password)
        if (!isValid) return res.status(400).json({ message: "Invalid email or password" })
        const token = jwt.sign({ id: user._id }, process.env.AUTH_SECRET_KEY, { expiresIn: '1d' })
        res.status(200).json({ message: "Logged in successfully", token })
    } catch (error) {

    }
}