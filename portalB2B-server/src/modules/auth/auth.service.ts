import {
  findUserByEmail,
  incrementFailedAttempts,
  lockUserAccount,
} from "./auth.repository.js";

export async function loginUser(email: string, password: string) {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error("Empty user");
  }

  if (user.is_locked) {
    throw new Error("Account is locked");
  }

  if (password !== user.password) {
    await incrementFailedAttempts(user.id);
    const newCount = user.failed_attempts + 1;
    if (newCount >= 3) {
      await lockUserAccount(user.id);
      throw new Error("Account locked due to too many failed attempts");
    }

    throw new Error("Invalid email or password");
  }

  return {
    id: user.id,
    email: user.email,
    role: user.role,
    mustChangePassword: user.must_change_password,
  };
}
