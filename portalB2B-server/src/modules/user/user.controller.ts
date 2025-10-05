import { Request, Response } from "express";
import {
  changeUserPassword,
  getAllUsersForAdmin,
  getDistributorsForManager,
  getEmployeesForDistributor,
  registerUser,
} from "./user.service.js";

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

export async function getMyDistributors(req: Request, res: Response) {
  try {
    const user = req.session.data;
    const distributors = await getDistributorsForManager(user);
    res.json({ data: distributors });
  } catch (err: any) {
    const message =
      err.message === "Access denied"
        ? "Access denied"
        : "Failed to fetch distributors";
    const code = err.message === "Access denied" ? 403 : 500;
    res.status(code).json({ error: message });
  }
}

export async function getMyEmployees(req: Request, res: Response) {
  try {
    const user = req.session.data;
    const employees = await getEmployeesForDistributor(user);
    res.json({ data: employees });
  } catch (err: any) {
    const message =
      err.message === "Access denied"
        ? "Access denied"
        : "Failed to fetch employees";
    const code = err.message === "Access denied" ? 403 : 500;
    res.status(code).json({ error: message });
  }
}

export async function getAllUsers(req: Request, res: Response) {
  try {
    const user = req.session.data;
    const users = await getAllUsersForAdmin(user);
    res.json({ data: users });
  } catch (err: any) {
    const message =
      err.message === "Access denied"
        ? "Access denied"
        : "Failed to fetch users";
    const code = err.message === "Access denied" ? 403 : 500;
    res.status(code).json({ error: message });
  }
}
