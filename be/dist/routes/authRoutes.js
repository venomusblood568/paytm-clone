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
const zod_1 = require("zod");
const router = express_1.default.Router();
const signupSchema = zod_1.z.object({
    firstname: zod_1.z.string(),
    lastname: zod_1.z.string(),
    username: zod_1.z.string(),
    password: zod_1.z.string(),
});
const signinSchema = zod_1.z.object({
    username: zod_1.z.string(),
    password: zod_1.z.string()
});
// Signup route
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsed = signupSchema.safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({ error: parsed.error.flatten().fieldErrors });
        return;
    }
    const { firstname, lastname, username, password } = parsed.data;
    try {
        const existingUser = yield db_1.UserModel.findOne({ username });
        if (existingUser) {
            res.status(409).json({ message: "User already exists" });
            return;
        }
        const newUser = yield db_1.UserModel.create({ firstname, lastname, username, password });
        yield db_1.AccountModel.create({
            userId: newUser._id,
            balance: 1 + Math.random() * 10000
        });
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
    const parsed = signinSchema.safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({ errors: parsed.error.flatten().fieldErrors });
        return;
    }
    const { username, password } = parsed.data;
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
