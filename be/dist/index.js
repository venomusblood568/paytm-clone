"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config();
const PORT = process.env.PORT || 3001;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/v1", routes_1.default);
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}/`);
});
