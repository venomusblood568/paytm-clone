import express from "express";
import authRouter from "./authRoutes";
import userRouter from "./userRoutes";
import testRouter from "./testRoutes";
import accountRoutes from "./accountRoutes";

const router = express.Router()

router.use("/test",testRouter);
router.use("/auth",authRouter);
router.use("/user",userRouter);
router.use("/account",accountRoutes);
export default router;
