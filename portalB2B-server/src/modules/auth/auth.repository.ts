import { RowDataPacket } from "mysql2";
import { dbPool } from "../../config/dbPool.js";

export interface UserRow {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;
}

export async function findUserByEmail(email: string) {
  const [rows] = await dbPool.query<(UserRow & RowDataPacket)[]>(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );
  return rows[0];
}
