import { CloudinaryStorage } from "multer-storage-cloudinary";
import { cloudinaryUpload } from "./cloudinary";
import multer from "multer";
import { UploadApiOptions } from "cloudinary";
import AppError from "../errorHelpers/AppError";

const storage = new CloudinaryStorage({
  cloudinary: cloudinaryUpload,
  params: (req, file): UploadApiOptions => {
    const originalName = file.originalname.toLowerCase().trim();
    const baseName = originalName.replace(/\.[^/.]+$/, "");
    const safeBaseName = baseName
      .replace(/\s+/g, "-")
      // eslint-disable-next-line no-useless-escape
      .replace(/[^a-z0-9\-]/g, "");

    const uniqueFileName =
      Math.random().toString(36).substring(2) +
      "-" +
      Date.now() +
      "-" +
      safeBaseName;

    return {
      folder: "tech_sea",
      public_id: uniqueFileName,
    };
  },
});

export const multerUpload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 },
});

export const imgUploader = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: (req, file, cb) => {
    const allowedImageTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedImageTypes.includes(file.mimetype)) {
      return cb(
        new AppError(
          400,
          "Invalid image file type. Only image files are allowed."
        )
      );
    }
    cb(null, true);
  },
});

export const singleImageUpload = imgUploader.single("image");
