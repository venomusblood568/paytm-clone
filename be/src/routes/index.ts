import express from "express";
import authRouter from "./authRoutes";
import userRouter from "./userRoutes";
import testRouter from "./testRoutes";

const router = express.Router()

router.use("/",testRouter);
router.use("/",authRouter);
router.use("/",userRouter);

export default router;
