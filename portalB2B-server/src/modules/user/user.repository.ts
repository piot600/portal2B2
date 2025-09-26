import { dbPool } from "../../config/dbPool.js";
import { ResultSetHeader } from "mysql2";

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
