"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllInvoice = exports.createInvoice = void 0;
const service_1 = require("../service/service");
const createInvoice = async (req, res) => {
    try {
        const invoice = req.body;
        const newProduct = await (0, service_1.CreateInvoiceData)({
            ...invoice,
        });
        // Respond with a success message and the newly created user data
        return res.status(201).json({
            message: "Invoice creation successfully!",
            Product: { newProduct },
        });
    }
    catch (error) {
        // Log the full error for debugging
        console.error("Invoice creation error:", error.message);
        // Send a more detailed error message to the client
        return res.status(500).json({
            message: "Invoice creation failed............",
            error: error.message,
        });
    }
};
exports.createInvoice = createInvoice;
const findAllInvoice = async (req, res) => {
    try {
        const invoices = await (0, service_1.findAll)();
        return res.status(200).json({
            invoices,
            message: "find All Invoices success",
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.findAllInvoice = findAllInvoice;
