"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const route_1 = __importDefault(require("./services/customers/routes/route"));
const route_2 = __importDefault(require("./services/products/routes/route"));
const route_3 = __importDefault(require("./services/invoices/routes/route"));
const router = (0, express_1.Router)();
// Use the invoice router
router.use("/customer", route_1.default);
router.use("/product", route_2.default);
router.use("/invoice", route_3.default);
exports.default = router;
