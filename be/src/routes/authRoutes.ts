import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { UserModel } from "../db";

const router = express.Router()

// Signup route
router.post(
  "/signup",
  async (req: Request, res: Response): Promise<void> => {
    const { firstname, lastname, username, password } = req.body;

    try {
      const existingUser = await UserModel.findOne({ username });
      if (existingUser) {
        res.status(409).json({ message: "User already exists" });
        return;
      }

      await UserModel.create({ firstname, lastname, username, password });

      console.log(`Username: ${username} and Password: ${password}`);
      res.status(201).json({ message: "User Signed Up" });
    } catch (error) {
      console.log(`Signup Error:`, error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

// Signin route
router.post(
  "/signin",
  async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;

    try {
      const existingUser = await UserModel.findOne({ username });
      if (!existingUser) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      const token = jwt.sign({ id: existingUser._id }, JWT_SECRET);
      res.status(200).json({ token, message: "User sigin Successfully" });
    } catch (error) {
      console.log(`Signin Error:`, error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

export default router;
