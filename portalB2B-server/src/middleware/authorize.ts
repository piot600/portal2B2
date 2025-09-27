import { Request, Response, NextFunction } from "express";

export function authorize(roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.session?.data;

    if (!user) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    if (!roles.includes(user.role)) {
      return res.status(403).json({ error: "Access denied" });
    }

    next();
  };
}

export function isGuest(req: Request, res: Response, next: NextFunction) {
  if (req.session?.data) {
    return res.status(403).json({ error: "You are already logged in" });
  }
  next();
}

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.session?.data) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  next();
}
