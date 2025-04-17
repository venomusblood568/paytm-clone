import express, { Request, Response } from "express";

const PORT = process.env.PORT || 3000;
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
app.post("/api/v1/signup",async(req:Request,res:Response) =>{
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const username = req.body.username
    const password = req.body.password
    try {
        //check if User already exits before creating new account
        const existingUser = await UserModel.findOne({username});
        if(existingUser){
            res.status(409).json({message:"User already exists"})
        }
        //Hashing of passowd is remaining
        await UserModel.create({firstname,lastname,username,password});
        console.log(`Username: ${username} and Password: ${password}`)
        res.status(201).json({message: "User Signed Up"})        
    } catch (error) {
        console.log(`Signup Error:`,error)
        res.status(500).json({message:"Internal Server Error"})
    }
})



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
