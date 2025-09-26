import "express-session";

declare module "express-session" {
  interface SessionData {
    data?: {
      id: number;
      email: string;
      role: string;
    };
  }
}
