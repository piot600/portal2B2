import { dbPool } from "../../config/dbPool.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export async function insertMediaFile(
  filename: string,
  path: string,
  type: string,
  uploaderId: number
) {
  const [result] = await dbPool.query<ResultSetHeader>(
    `INSERT INTO media_files (filename, path, type, uploader_id) VALUES (?, ?, ?, ?)`,
    [filename, path, type, uploaderId]
  );
  return result.insertId;
}

export async function getAllMediaFiles() {
  const [rows] = await dbPool.query<RowDataPacket[]>(`
    SELECT m.*, u.email AS uploader_email
    FROM media_files m
    JOIN users u ON m.uploader_id = u.id
    ORDER BY m.created_at DESC
  `);
  return rows;
}

export async function getPublicMediaFiles() {
  const [rows] = await dbPool.query<RowDataPacket[]>(`
    SELECT id, filename, path, type, created_at
    FROM media_files
    ORDER BY created_at DESC
  `);
  return rows;
}

export async function deleteMediaFileById(id: number) {
  await dbPool.query(`DELETE FROM media_files WHERE id = ?`, [id]);
}

export async function findMediaById(id: number) {
  const [rows] = await dbPool.query<RowDataPacket[]>(
    `SELECT * FROM media_files WHERE id = ?`,
    [id]
  );
  return rows[0];
}
