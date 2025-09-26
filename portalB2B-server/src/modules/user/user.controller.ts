import { Request, Response } from "express";
import { registerUser } from "./user.service.js";

export async function addUser(req: Request, res: Response) {
  try {
    const { email, role } = req.body;
    const { userId } = await registerUser(email, role);

    res.json({
      message: "Account has been created",
      userId,
    });
  } catch (err: any) {
    if (err.code === "ER_DUP_ENTRY") {
      return res
        .status(400)
        .json({ error: "A user with this email already exists" });
    }

    if (err.message === "Email and role are required") {
      return res.status(400).json({ error: err.message });
    }

    console.error(err);
    res.status(500).json({ error: "Failed to create user" });
  }
}
