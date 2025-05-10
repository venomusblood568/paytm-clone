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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const db_1 = require("../db");
const router = express_1.default.Router();
// Signup route
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstname, lastname, username, password } = req.body;
    try {
        const existingUser = yield db_1.UserModel.findOne({ username });
        if (existingUser) {
            res.status(409).json({ message: "User already exists" });
            return;
        }
        yield db_1.UserModel.create({ firstname, lastname, username, password });
        console.log(`Username: ${username} and Password: ${password}`);
        res.status(201).json({ message: "User Signed Up" });
    }
    catch (error) {
        console.log(`Signup Error:`, error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
// Signin route
router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const existingUser = yield db_1.UserModel.findOne({ username });
        if (!existingUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: existingUser._id }, config_1.JWT_SECRET);
        res.status(200).json({ token, message: "User sigin Successfully" });
    }
    catch (error) {
        console.log(`Signin Error:`, error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
exports.default = router;
