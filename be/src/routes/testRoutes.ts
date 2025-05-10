import express, { Request, Response } from "express";

const router = express.Router()
// Test route
router.get("/testroutes", (req: Request, res: Response) => {
  res.status(200).json({ message: "All routes working fine" });
});

export default router;
