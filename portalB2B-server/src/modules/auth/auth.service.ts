import { findUserByEmail } from "./auth.repository.js";

export async function loginUser(email: string, password: string) {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  if (password !== user.password) {
    throw new Error("Invalid email or password");
  }

  return {
    id: user.id,
    email: user.email,
    role: user.role,
  };
}
