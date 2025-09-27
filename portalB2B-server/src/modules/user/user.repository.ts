import { dbPool } from "../../config/dbPool.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { UserRow } from "../../types/user.js";

export async function createUser(
  username: string,
  email: string,
  password: string,
  role: string
) {
  const [result] = await dbPool.query<ResultSetHeader>(
    `INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)`,
    [username, email, password, role]
  );

  return result.insertId;
}

export async function updateUserPasswordRepo(
  userId: number,
  newPassword: string
): Promise<void> {
  await dbPool.query<ResultSetHeader>(
    `UPDATE users SET password = ?, must_change_password = false WHERE id = ?`,
    [newPassword, userId]
  );
}

export async function findUserById(id: number) {
  const [rows] = await dbPool.query<(UserRow & RowDataPacket)[]>(
    "SELECT * FROM users WHERE id = ?",
    [id]
  );
  return rows[0];
}
