import {
  createUser,
  findAllUsers,
  findDistributorsByManager,
  findEmployeesByDistributor,
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

export async function getDistributorsForManager(user: any) {
  if (user.role !== "manager") throw new Error("Access denied");
  return findDistributorsByManager(user.id);
}

export async function getEmployeesForDistributor(user: any) {
  if (user.role !== "distributor") throw new Error("Access denied");
  return findEmployeesByDistributor(user.id);
}

export async function getAllUsersForAdmin(user: any) {
  if (!["admin", "superadmin"].includes(user.role))
    throw new Error("Access denied");
  return findAllUsers();
}
