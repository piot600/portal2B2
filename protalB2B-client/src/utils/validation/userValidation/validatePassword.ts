export function validatePassword(password: string): boolean {
  const regex = /^(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
  return regex.test(password);
}
