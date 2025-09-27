import {
  createUser,
  findUserById,
  updateUserPasswordRepo,
} from "./user.repository.js";
import { validatePassword } from "./validation/validatePassword.js";

export async function registerUser(email: string, role: string) {
  if (!email || !role) {
    throw new Error("Email and role are required");
  }

  const username = email.split("@")[0];
  const tempPassword = "test"; // wersja DEMO ------------

  const userId = await createUser(username, email, tempPassword, role);

  return { userId, username, tempPassword };
}

export async function changeUserPassword(userId: number, password: string) {
  validatePassword(password);

  await updateUserPasswordRepo(userId, password);
  const updatedUser = await findUserById(userId);
  if (!updatedUser) {
    throw new Error("User not found after password update");
  }

  return updatedUser;
}
