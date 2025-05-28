import express,{Response,Request}from "express";

const router = express.Router()
router.get("/accountroutes",(req:Request,res:Response) => {
    res.status(200).json({message :"dummy route for account"})
})
export default router;
