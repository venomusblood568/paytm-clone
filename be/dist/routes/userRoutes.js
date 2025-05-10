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
const zod_1 = require("zod");
const router = express_1.default.Router();
const updateUserSchema = zod_1.z.object({
    firstname: zod_1.z.string().optional(),
    lastname: zod_1.z.string().optional(),
    password: zod_1.z.string().optional()
});
// Update user route
router.put("/update", middleware_1.UserMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedData = updateUserSchema.parse(req.body);
        if (Object.keys(parsedData).length === 0) {
            res.status(400).json({ message: "At least one field must be provided" });
            return;
        }
        const updatedUser = yield db_1.UserModel.findByIdAndUpdate(req.userId, parsedData, { new: true });
        if (!updatedUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json({ message: "User Info updated", user: updatedUser });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            res.status(400).json({ message: "Validation Error", error: error.errors });
        }
        else {
            console.log(`Update Error:`, error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
}));
router.get("/bulk", middleware_1.UserMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const filter = ((_a = req.query.filter) === null || _a === void 0 ? void 0 : _a.toString()) || "";
    try {
        const users = yield db_1.UserModel.find({
            _id: { $ne: req.userId },
            $or: [
                { firstname: { $regex: filter, $options: "i" } },
                { lastname: { $regex: filter, $options: "i" } }
            ]
        });
        res.status(200).json({
            user: users.map(user => ({
                _id: user._id,
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname
            }))
        });
    }
    catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
exports.default = router;
