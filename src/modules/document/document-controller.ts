import { Request, Response } from "express";
import cloudinary from "../../middleware/cloudinarymiddleware";
import Document from "../document/document-model";

export const uploadDocument = async (req: Request, res: Response) => {
    try {
        if (!req.file) return res.status(400).json({ message: "No file Upload" })
            console.log('Incoming file:', req.file); // Log file details
        console.log('Incoming body:', req.body);
        cloudinary.uploader.upload_stream({ resource_type: "raw" }, async (error, result) => {
            if (error) return res.status(400).json({ message: "Cloudinary failed" })
            const document = new Document({
                uploader: (req as any).user._id,
                cloudinaryUrl: result?.secure_url,
                status: "pending"
            })
            await document.save()
            res.status(201).json({ message: "Document uploaded successfully" })
        }).end(req.file.buffer);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const approvedDocument = async (req: Request, res: Response) => {
    try {
        const document = await Document.findById(req.params.id);
        if (!document) return res.status(404).json({ message: "Document not found" })
        document.status = "approved"
        await document.save()
        res.status(200).json({ message: "Document approved successfully" })

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });

    }
}