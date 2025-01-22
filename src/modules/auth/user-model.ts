import mongoose, { Schema, Document } from "mongoose";

export interface Iuser extends Document {
    name: string;
    email: string;
    password: string;
    role: "A" | "B";
}
const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ["A", "B"] }
})
export default mongoose.model("User", UserSchema)