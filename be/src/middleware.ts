// middleware.ts
import { NextFunction, Response, Request } from "express";
import { JWT_SECRET } from "./config";
import jwt, { JwtPayload } from "jsonwebtoken";
import { RequestHandler } from "express";

interface DecodedToken extends JwtPayload {
  id: string;
}

export const UserMiddleware: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: "No token provided" });
    return;
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token" });
    return;
  }
};
