import express, { Request, Response } from "express";
import { UserMiddleware } from "../middleware";
import { UserModel } from "../db";

const router = express.Router()


// Update user route
router.put(
  "/update",
  UserMiddleware,
  async (req: Request, res: Response): Promise<void> => {
    const { firstname, lastname, password } = req.body;
    const updatedData: Record<string, string> = {};

    if (firstname) updatedData.firstname = firstname;
    if (lastname) updatedData.lastname = lastname;
    if (password) updatedData.password = password;

    try {
      const updatedUser = await UserModel.findByIdAndUpdate(
        req.userId,
        updatedData,
        { new: true }
      );

      if (!updatedUser) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      res.status(200).json({ message: "User Info updated", user: updatedUser });
    } catch (error) {
      console.log(`Update Error:`, error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

export default router;