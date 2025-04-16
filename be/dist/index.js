"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.get("/testroutes", (req, res) => {
    try {
        res.status(200).json({ message: "All routes working fine" });
    }
    catch (error) {
        res
            .status(500)
            .json({ error: `Internal Server Error: ${error.message}` });
    }
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
