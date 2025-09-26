export function validateEmail(email: string): boolean {
  if (email.length <= 7) return false;

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
