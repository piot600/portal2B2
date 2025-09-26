export interface CredentialsDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  role: string;
}

export interface UserDto {
  id: number;
  email: string;
  role: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
}
