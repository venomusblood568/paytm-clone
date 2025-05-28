"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../middleware");
const db_1 = require("../db");
const router = express_1.default.Router();
router.get("/accountroutes", (req, res) => {
    res.status(200).json({ message: "dummy route for account" });
});
router.get("/balance", middleware_1.UserMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find the account for the user
        const account = yield db_1.AccountModel.findOne({
            userId: req.userId,
        });
        if (!account) {
            res.status(404).json({ message: "Account not found for the user" });
            return;
        }
        // Find the user to get the username
        const user = yield db_1.UserModel.findById(req.userId).select("username");
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json({
            balance: account.balance,
            username: user.username,
        });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Something went wrong in the backend", error });
    }
}));
router.post("/transfer", middleware_1.UserMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { amount, to } = req.body;
        if (!amount || !to) {
            res
                .status(400)
                .json({ message: "Amount and recipient (to) are required." });
            return;
        }
        const senderAccount = yield db_1.AccountModel.findOne({ userId: req.userId });
        if (!senderAccount) {
            res.status(404).json({ message: "Sender account not found." });
            return;
        }
        if (senderAccount.balance < amount) {
            res.status(400).json({ message: "Insufficient balance." });
            return;
        }
        const recipientAccount = yield db_1.AccountModel.findOne({ userId: to });
        if (!recipientAccount) {
            res.status(404).json({ message: "Recipient account not found." });
            return;
        }
        // Perform balance updates
        yield db_1.AccountModel.updateOne({ userId: req.userId }, { $inc: { balance: -amount } });
        yield db_1.AccountModel.updateOne({ userId: to }, { $inc: { balance: amount } });
        res.status(200).json({ message: "Transfer successful." });
    }
    catch (error) {
        console.error("Transfer Error:", error);
        res.status(500).json({ message: "Something went wrong.", error });
    }
}));
exports.default = router;
