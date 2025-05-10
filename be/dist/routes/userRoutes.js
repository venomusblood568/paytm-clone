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
// Update user route
router.put("/update", middleware_1.UserMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstname, lastname, password } = req.body;
    const updatedData = {};
    if (firstname)
        updatedData.firstname = firstname;
    if (lastname)
        updatedData.lastname = lastname;
    if (password)
        updatedData.password = password;
    try {
        const updatedUser = yield db_1.UserModel.findByIdAndUpdate(req.userId, updatedData, { new: true });
        if (!updatedUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json({ message: "User Info updated", user: updatedUser });
    }
    catch (error) {
        console.log(`Update Error:`, error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
exports.default = router;
