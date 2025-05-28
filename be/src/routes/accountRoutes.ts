import express, { Response, Request } from "express";
import { UserMiddleware } from "../middleware";
import { AccountModel } from "../db";
import mongoose from "mongoose";

const router = express.Router();
router.get("/accountroutes", (req: Request, res: Response) => {
  res.status(200).json({ message: "dummy route for account" });
});

router.get(
  "/balance",
  UserMiddleware,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const account = await AccountModel.findOne({
        userId: req.userId,
      });
      if (!account) {
        res.status(404).json({ message: "Account not found for the user" });
        return
      }
      res.status(200).json({ balance: account?.balance });
    } catch (error) {
      res
        .status(404)
        .json({ message: "Something went wrong in the backend", error });
    }
  }
);

router.post(
  "/transfer",
  UserMiddleware,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { amount, to } = req.body;

      if (!amount || !to) {
        res
          .status(400)
          .json({ message: "Amount and recipient (to) are required." });
        return;
      }

      const senderAccount = await AccountModel.findOne({ userId: req.userId });
      if (!senderAccount) {
        res.status(404).json({ message: "Sender account not found." });
        return;
      }

      if (senderAccount.balance < amount) {
        res.status(400).json({ message: "Insufficient balance." });
        return;
      }

      const recipientAccount = await AccountModel.findOne({ userId: to });
      if (!recipientAccount) {
        res.status(404).json({ message: "Recipient account not found." });
        return;
      }

      // Perform balance updates
      await AccountModel.updateOne(
        { userId: req.userId },
        { $inc: { balance: -amount } }
      );
      await AccountModel.updateOne(
        { userId: to },
        { $inc: { balance: amount } }
      );

      res.status(200).json({ message: "Transfer successful." });
    } catch (error) {
      console.error("Transfer Error:", error);
      res.status(500).json({ message: "Something went wrong.", error });
    }
  }
);
     

export default router;
