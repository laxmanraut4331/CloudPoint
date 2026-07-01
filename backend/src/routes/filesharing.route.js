import express from "express";

import {
  uploadFile,
  getFiles,
  deleteFile,
  restoreFile,
  deleteFilePermanently,
  toggleFavorite,
  getStorageUsage,
} from "../controllers/filesharing.contoller.js";

import { upload } from "../middleware/cloudinary.middleware.js";

import { isLoggedIn } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/upload", isLoggedIn, upload.single("file"), uploadFile);

router.get("/", isLoggedIn, getFiles);

router.delete("/:id", isLoggedIn, deleteFile);

router.put("/restore/:id", isLoggedIn, restoreFile);

router.delete("/permanent/:id", isLoggedIn, deleteFilePermanently);

router.put("/favorite/:id", isLoggedIn, toggleFavorite);

router.get("/storage", isLoggedIn, getStorageUsage);

export default router;
