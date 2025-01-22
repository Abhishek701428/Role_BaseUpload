import mongoose, { Schema, Document } from "mongoose";
export interface Idocument extends Document {
    uploader: mongoose.Schema.Types.ObjectId
    cloudinaryUrl: string;
    status: "pending" | "approved"
}
const DocumentSchema: Schema = new Schema({
    uploader: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    cloudinaryUrl: { type: String, required: true },
    status: { type: String, default: "pending", enum: ["pending", "approved"] }
})
export default mongoose.model("Document", DocumentSchema)