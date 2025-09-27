import { RowDataPacket } from "mysql2";
import { dbPool } from "../../config/dbPool.js";
import { UserRow } from "../../types/user.js";

export async function findUserByEmail(email: string) {
  const [rows] = await dbPool.query<(UserRow & RowDataPacket)[]>(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );
  return rows[0];
}
