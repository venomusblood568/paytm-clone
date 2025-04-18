import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";
import { UserMiddleware } from "./middleware";

const PORT = process.env.PORT || 3001;
const app = express();

//Test routes
app.get("/api/testroutes", (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: "All routes working fine" });
  } catch (error: any) {
    res.status(500).json({ error: `Internal Server Error: ${error.message}` });
  }
});

// Signup route
app.post("/api/v1/signup", async (req: Request, res: Response) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const username = req.body.username;
  const password = req.body.password;
  try {
    //check if User already exits before creating new account
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      res.status(409).json({ message: "User already exists" });
    }
    //Hashing of passowd is remaining
    await UserModel.create({ firstname, lastname, username, password });
    console.log(`Username: ${username} and Password: ${password}`);
    res.status(201).json({ message: "User Signed Up" });
  } catch (error) {
    console.log(`Signup Error:`, error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Signin route
app.post("/api/v1/signin", async (req: Request, res: Response) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const existingUser = await UserModel.findOne({ username });
    if (!existingUser) {
      res.status(404).json({ message: "User not found" });
    }
    const token = jwt.sign({ id: existingUser._id }, JWT_SECRET);
    res.status(200).json({ token });
  } catch (error) {
    console.log(`Signin Error:`, error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//update Routes
app.put(
  "/api/v1/update",
  UserMiddleware,
  async (req: Request, res: Response) => {
    const { firstname, lastname, password } = req.body;
    const updatedData = {};
    if (firstname) updatedData.firstname = firstname;
    if (lastname) updatedData.lastname = lastname;
    if (password) updatedData.password = password;
    try {
      const upadateUser = await userModel.findByIdAndUpdate(
        req.userId,
        updatedData,
        {new:true}
      )
      if(!upadateUser){
        res.status(404).json({message:"User not found"})
      }
      res.status(200).json({message:"User Info update", user:upadateUser})
    } catch (error) {
      console.log(`Signin Error:`, error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
