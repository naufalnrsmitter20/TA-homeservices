import express, { Request, Response } from "express";
import multer from "multer";
import cloudinary from "../utils/cloudinary";

export const UploadImageCloudinary = (req: Request, res: Response) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ message: "No file uploaded" });
    const result = cloudinary.uploader.upload_stream(
      {
        folder: "uploads",
        public_id: file.originalname.split(".")[0],
        resource_type: "image",
        upload_preset: "ml_default",
      },
      (error, result) => {
        if (error || !result) {
          return res.status(500).json({ error: error?.message });
        }

        return res.status(200).json({ url: result.secure_url });
      }
    );

    if (file.buffer) {
      require("streamifier").createReadStream(file.buffer).pipe(result);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};
