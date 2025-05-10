import express, { Request, Response } from "express";
import { UserMiddleware } from "../middleware";
import { UserModel } from "../db";
import {z} from "zod";

const router = express.Router()

const updateUserSchema = z.object({
    firstname: z.string().optional(),
    lastname: z.string().optional(),
    password: z.string().optional()
})

// Update user route
router.put(
  "/update",
  UserMiddleware,
  async (req: Request, res: Response): Promise<void> => {

    try {
        
     const parsedData = updateUserSchema.parse(req.body);
     if(Object.keys(parsedData).length === 0){
        res.status(400).json({message:"At least one field must be provided"})
        return;
     }
      const updatedUser = await UserModel.findByIdAndUpdate(
        req.userId,
        parsedData,
        { new: true }
      );

      if (!updatedUser) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      res.status(200).json({ message: "User Info updated", user: updatedUser });
    } catch (error) {
      if(error instanceof z.ZodError){
        res.status(400).json({message:"Validation Error",error:error.errors})
      }else{
        console.log(`Update Error:`, error);
      res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }
);

router.get("/bulk", UserMiddleware, async(req:Request, res:Response): Promise<void> => {
    const filter = req.query.filter?.toString() || "";
    try{
        const users = await UserModel.find({
            _id:{ $ne : req.userId },
            $or:[
                {firstname: {$regex:filter, $options:"i"}},
                {lastname: {$regex:filter, $options:"i"}}
            ]
        })
        res.status(200).json({
            user: users.map(user => ({
                _id:user._id,
                username: user.username,
                firstname:user.firstname,
                lastname:user.lastname

            }))
        })
    } catch(error){
        console.error("Error fetching user:", error);
        res.status(500).json({message:"Internal Server Error"});
    }
})

export default router;