import { validatePassword } from "../../../utils/validation/userValidation/validatePassword";

export function validateUserPasswords(
  password: string,
  confirmPassword: string
): string {
  if (password !== confirmPassword) {
    return "Passwords are differend";
  }

  if (!validatePassword(password)) {
    return "Password shoud contains at least 8 chars (1 digit, 1 special char)";
  }

  return "";
}
