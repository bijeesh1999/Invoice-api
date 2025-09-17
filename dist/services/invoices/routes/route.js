"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("../controllers/controller");
const router = (0, express_1.Router)();
router.post("/create", controller_1.createInvoice);
router.get("/list", controller_1.findAllInvoice);
router.delete("/delete/:id", controller_1.deleteInvoice);
exports.default = router;
