import { Request, Response } from "express";
import { changeUserPassword, registerUser } from "./user.service.js";

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

export async function changePassword(req: Request, res: Response) {
  try {
    const userId = req.session.data?.id;
    const { password } = req.body;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const updatedUser = await changeUserPassword(userId, password);

    // 🔄 odświeżamy sesję najnowszym userem
    req.session.data = {
      id: updatedUser.id,
      email: updatedUser.email,
      role: updatedUser.role,
      mustChangePassword: updatedUser.must_change_password,
    };

    res.status(200).json({
      message: "Password updated successfully",
      data: req.session.data,
    });
  } catch (err: any) {
    console.error(err);

    if (err.message.includes("Password")) {
      return res.status(400).json({ error: err.message });
    }

    res.status(500).json({ error: "Failed to update password" });
  }
}
