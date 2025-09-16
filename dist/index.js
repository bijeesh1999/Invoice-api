"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const port_1 = require("./config/port");
const app_1 = __importDefault(require("./app"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api", app_1.default);
(0, port_1.portConfig)();
exports.default = app;
