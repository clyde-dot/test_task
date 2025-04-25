"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
function start() {
    (0, dotenv_1.configDotenv)();
    const app = (0, express_1.default)();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Running on port ${PORT}`));
}
start();
