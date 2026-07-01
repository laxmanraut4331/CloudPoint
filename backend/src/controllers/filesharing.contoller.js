import FileModel from "../models/file.model.js";
import { v2 as cloudinary } from "cloudinary";

/*    STORAGE LIMIT CONSTANT  */
const STORAGE_LIMIT = 10 * 1024 * 1024 * 1024; 

/*    UPLOAD FILE */
export const uploadFile = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({
        message: "No file uploaded",
      });

    const userId = req.admin._id;

    
    const result = await FileModel.aggregate([
      {
        $match: {
          uploadedBy: userId,
          isTrash: false,
        },
      },
      {
        $group: {
          _id: null,
          totalSize: { $sum: "$fileSize" },
        },
      },
    ]);

    const usedBytes = result[0]?.totalSize || 0;

    if (usedBytes + req.file.size > STORAGE_LIMIT)
      return res.status(400).json({
        message: "Storage limit exceeded",
      });

    /* Detect file type */

    const mimeType = req.file.mimetype;

    let fileType = "documents";

    if (mimeType.startsWith("image/")) fileType = "images";
    else if (mimeType.startsWith("video/")) fileType = "videos";

    const newFile = new FileModel({
      filename: req.body.filename || req.file.originalname,

      fileUrl: req.file.path,

      public_id: req.file.filename,

      fileType,

      fileSize: req.file.size,

      uploadedBy: userId,
    });

    await newFile.save();

    res.status(200).json({
      message: "File uploaded successfully",
      fileDetails: newFile,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Upload failed",
    });
  }
};

/*  GET FILES WITH CATEGORY FILTER */

export const getFiles = async (req, res) => {
  try {
    const userId = req.admin._id;

    const { category } = req.query;

    let filter = {
      uploadedBy: userId,
    };

    if (category === "images") filter.fileType = "images";
    else if (category === "videos") filter.fileType = "videos";
    else if (category === "documents") filter.fileType = "documents";
    else if (category === "favorites") filter.isFavorite = true;

    if (category === "trash") filter.isTrash = true;
    else filter.isTrash = false;

    const files = await FileModel.find(filter).sort({ createdAt: -1 });

    res.status(200).json(files);
  } catch (err) {
    res.status(500).json({
      message: "Fetch failed",
    });
  }
};

/*    MOVE TO TRASH (SOFT DELETE) */

export const deleteFile = async (req, res) => {
  try {
    const file = await FileModel.findById(req.params.id);

    if (!file)
      return res.status(404).json({
        message: "File not found",
      });

    file.isTrash = true;

    await file.save(); // ← VERY IMPORTANT

    res.status(200).json({
      message: "Moved to trash",
      file,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Delete failed",
    });
  }
};

/*    RESTORE FILE FROM TRASH */

export const restoreFile = async (req, res) => {
  try {
    const file = await FileModel.findById(req.params.id);

    if (!file)
      return res.status(404).json({
        message: "File not found",
      });

    file.isTrash = false;

    await file.save();

    res.status(200).json({
      message: "File restored",
      file,
    });
  } catch {
    res.status(500).json({
      message: "Restore failed",
    });
  }
};

/*    PERMANENT DELETE */

export const deleteFilePermanently = async (req, res) => {
  try {
    const file = await FileModel.findById(req.params.id);

    if (!file)
      return res.status(404).json({
        message: "File not found",
      });

    await cloudinary.uploader.destroy(file.public_id);

    await file.deleteOne();

    res.status(200).json({
      message: "File permanently deleted",
    });
  } catch {
    res.status(500).json({
      message: "Permanent delete failed",
    });
  }
};

/*    TOGGLE FAVORITE  */

export const toggleFavorite = async (req, res) => {
  try {
    const file = await FileModel.findById(req.params.id);

    if (!file)
      return res.status(404).json({
        message: "File not found",
      });

    file.isFavorite = !file.isFavorite;

    await file.save();

    res.status(200).json(file);
  } catch {
    res.status(500).json({
      message: "Favorite toggle failed",
    });
  }
};

/*   STORAGE USAGE */

export const getStorageUsage = async (req, res) => {
  try {
    const result = await FileModel.aggregate([
      {
        $match: {
          uploadedBy: req.admin._id,
          isTrash: false,
        },
      },
      {
        $group: {
          _id: null,
          totalSize: {
            $sum: "$fileSize",
          },
        },
      },
    ]);

    const usedBytes = result[0]?.totalSize || 0;

    res.status(200).json({
      usedBytes,
    });
  } catch {
    res.status(500).json({
      message: "Storage fetch failed",
    });
  }
};
