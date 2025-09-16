"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("../controllers/controller");
const userRouter = (0, express_1.Router)();
userRouter.post("/signUp", controller_1.userSignUp);
exports.default = userRouter;
