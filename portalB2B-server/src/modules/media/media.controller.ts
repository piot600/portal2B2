import { Request, Response } from "express";
import { addMediaFile, getAllFiles, removeMediaFile } from "./media.service.js";

export async function uploadMedia(req: Request, res: Response) {
  try {
    const user = req.session.data;
    if (!user || !req.file)
      return res.status(400).json({ error: "Missing file or authentication" });

    const saved = await addMediaFile(user, req.file);
    res.json({ message: "File uploaded successfully", data: saved });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to upload file" });
  }
}

export async function listMedia(req: Request, res: Response) {
  try {
    const user = req.session.data;
    const files = await getAllFiles(user);
    res.json({ data: files });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load files" });
  }
}

export async function deleteMediaFile(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    await removeMediaFile(id);
    res.json({ message: "File deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete file" });
  }
}
