import fs from "fs";
import path from "path";
import {
  insertMediaFile,
  getAllMediaFiles,
  getPublicMediaFiles,
  deleteMediaFileById,
  findMediaById,
} from "./media.repository.js";

export async function addMediaFile(user: any, file: Express.Multer.File) {
  // 🔹 zapis relatywnej ścieżki względem katalogu głównego
  const relativePath = file.path.replace(process.cwd() + path.sep, "");

  const id = await insertMediaFile(
    file.originalname,
    relativePath,
    file.mimetype,
    user.id
  );

  return { id, filename: file.originalname, path: relativePath };
}

export async function getAllFiles(user: any) {
  if (["admin", "superadmin"].includes(user.role)) {
    return await getAllMediaFiles();
  }
  return await getPublicMediaFiles();
}

export async function removeMediaFile(id: number) {
  const file = await findMediaById(id);
  if (!file) throw new Error("File not found");

  const filePath = path.join(process.cwd(), file.path);

  try {
    await fs.promises.unlink(filePath);
  } catch {
    console.warn(`⚠️ File missing on disk: ${filePath}`);
  }

  await deleteMediaFileById(id);
}
