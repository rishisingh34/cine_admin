"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const corsOptions = {
    origin: [
        "https://ornate-duckanoo-8bcb1e.netlify.app"
    ],
    credentials: true,
    optionsSuccessStatus: 200,
};
const handleCors = (0, cors_1.default)(corsOptions);
exports.default = handleCors;
