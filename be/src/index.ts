import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";
import { UserMiddleware } from "./middleware";
import { UserModel } from "./db";

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json()); 

// Test route
app.get("/api/testroutes", (req: Request, res: Response) => {
  res.status(200).json({ message: "All routes working fine" });
});

// Signup route
app.post(
  "/api/v1/signup",
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
app.post(
  "/api/v1/signin",
  async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;

    try {
      const existingUser = await UserModel.findOne({ username });
      if (!existingUser) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      const token = jwt.sign({ id: existingUser._id }, JWT_SECRET);
      res.status(200).json({ token });
    } catch (error) {
      console.log(`Signin Error:`, error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

// Update user route
app.put(
  "/api/v1/update",
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

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}/`);
});
