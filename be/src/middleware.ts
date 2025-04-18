import { NextFunction,Response,Request } from "express";
import { JWT_SECRET } from "./config";
import jwt from "jsonwebtoken";

export const UserMiddleware = async(
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const authheader = req.headers["authorization"]
    if(!authheader){
        res.status(401).json({message:"No Token provided"})
    }
    const decoded = jwt.verify(authheader as string, JWT_SECRET)
    if(decoded){
        req.userId = decoded.id
        next()
    }else{
        res.status(403).json({message:"Unauthorized User"})
    }
}