import express, { Response, Request } from "express";
import { UserMiddleware } from "../middleware";
import { AccountModel } from "../db";

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
export default router;
