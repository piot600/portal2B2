import { Request, Response } from "express";
import { loginUser } from "./auth.service.js";

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const userData = await loginUser(email, password);

    req.session.data = userData;
    res.json({ message: "Logged in", data: userData });
  } catch (err: any) {
    if (err.message === "Invalid email or password") {
      return res.status(401).json({ error: err.message });
    }

    if (
      err.message === "Account is locked" ||
      err.message === "Account locked due to too many failed attempts"
    ) {
      return res.status(403).json({ error: err.message });
    }

    console.error(err);
    res.status(500).json({ error: "Server error during login" });
  }
}

export function isLogged(req: Request, res: Response) {
  if (!req.session.data) {
    return res.status(401).json({ error: "You are not logged in" });
  }
  res.json({ data: req.session.data });
}

export function logout(req: Request, res: Response) {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to log out" });
    }
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out" });
  });
}
