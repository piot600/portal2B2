import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { authorize } from "../../middleware/authorize.js";
import { uploadMedia, listMedia, deleteMediaFile } from "./media.controller.js";

// ✅ konfiguracja multer z zachowaniem rozszerzenia
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext);
    cb(null, `${base}-${Date.now()}${ext}`);
  },
});

const upload = multer({ storage });
const router = Router();

// 📤 Upload — tylko manager, admin, superadmin
router.post(
  "/upload",
  authorize(["manager", "admin", "superadmin"]),
  upload.single("file"),
  uploadMedia
);

// 👀 Lista — dla wszystkich zalogowanych
router.get(
  "/",
  authorize(["employee", "distributor", "manager", "admin", "superadmin"]),
  listMedia
);

// 🗑️ Usuwanie — tylko admin / superadmin
router.delete(
  "/:id",
  authorize(["manager", "admin", "superadmin"]),
  deleteMediaFile
);

export default router;
