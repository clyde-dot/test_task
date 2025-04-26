"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = require("dotenv");
function start() {
    (0, dotenv_1.configDotenv)();
    var app = (0, express_1.default)();
    var PORT = process.env.PORT || 5000;
    app.listen(PORT, function () { return console.log("Running on port ".concat(PORT)); });
}
start();
//# sourceMappingURL=index.js.map