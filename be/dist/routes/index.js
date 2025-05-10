"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRoutes_1 = __importDefault(require("./authRoutes"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
const testRoutes_1 = __importDefault(require("./testRoutes"));
const router = express_1.default.Router();
router.use("/", testRoutes_1.default);
router.use("/", authRoutes_1.default);
router.use("/", userRoutes_1.default);
exports.default = router;
