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
const config_1 = require("./config");
const middleware_1 = require("./middleware");
const db_1 = require("./db");
require('dotenv').config();
const PORT = process.env.PORT || 3001;
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Test route
app.get("/api/testroutes", (req, res) => {
    res.status(200).json({ message: "All routes working fine" });
});
// Signup route
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
// Update user route
app.put("/api/v1/update", middleware_1.UserMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}/`);
});
