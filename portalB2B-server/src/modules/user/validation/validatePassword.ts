export function validatePassword(password: string): void {
  if (!password) {
    throw new Error("Password is required");
  }

  const regex = /^(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
  if (!regex.test(password)) {
    throw new Error("Password does not meet requirements");
  }
}
