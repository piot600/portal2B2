import { ResultSetHeader, RowDataPacket } from "mysql2";
import { dbPool } from "../../config/dbPool.js";
import { UserRow } from "../../types/user.js";

export async function findUserByEmail(email: string) {
  const [rows] = await dbPool.query<(UserRow & RowDataPacket)[]>(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );
  return rows[0];
}

export async function incrementFailedAttempts(userId: number) {
  await dbPool.query<ResultSetHeader>(
    "UPDATE users SET failed_attempts = failed_attempts + 1 WHERE id = ?",
    [userId]
  );
}

export async function resetFailedAttempts(userId: number) {
  await dbPool.query<ResultSetHeader>(
    "UPDATE users SET failed_attempts = 0 WHERE id = ?",
    [userId]
  );
}

export async function lockUserAccount(userId: number) {
  await dbPool.query<ResultSetHeader>(
    "UPDATE users SET is_locked = 1 WHERE id = ?",
    [userId]
  );
}
