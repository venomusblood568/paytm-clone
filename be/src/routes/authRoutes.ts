import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { AccountModel, UserModel } from "../db";
import {z} from "zod";

const router = express.Router()

const signupSchema = z.object({
    firstname: z.string(),
    lastname: z.string(),
    username: z.string(),
    password:z.string(),

})

const signinSchema = z.object({
    username:z.string(),
    password:z.string()
})

// Signup route
router.post(
  "/signup",
  async (req: Request, res: Response): Promise<void> => {
    const parsed = signupSchema.safeParse(req.body);
    
    if(!parsed.success){
        res.status(400).json({error: parsed.error.flatten().fieldErrors})
        return;
    }

    const {firstname,lastname,username,password} = parsed.data;

    try {
      const existingUser = await UserModel.findOne({ username });
      if (existingUser) {
        res.status(409).json({ message: "User already exists" });
        return;
      }

      const newUser = await UserModel.create({ firstname, lastname, username, password });
      
      await AccountModel.create({
        userId: newUser._id,
        balance: 1 + Math.random() * 10000
      })
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
    const parsed = signinSchema.safeParse(req.body);

    if(!parsed.success){
        res.status(400).json({errors:parsed.error.flatten().fieldErrors});
        return;
    }

    const {username,password} = parsed.data;

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
