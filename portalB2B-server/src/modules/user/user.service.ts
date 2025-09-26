import { createUser } from "./user.repository.js";

export async function registerUser(email: string, role: string) {
  if (!email || !role) {
    throw new Error("Email and role are required");
  }

  const username = email.split("@")[0];
  const tempPassword = "test"; // wersja DEMO ------------

  const userId = await createUser(username, email, tempPassword, role);

  return { userId, username, tempPassword };
}
