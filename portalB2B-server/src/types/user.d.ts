export interface UserRow {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;
  must_change_password: boolean;
}
