"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAll = exports.CreateInvoiceData = void 0;
const model_1 = __importDefault(require("../model/model"));
const CreateInvoiceData = async (invoice) => {
    console.log({ invoice });
    const newUser = await model_1.default.create(invoice);
    return newUser;
};
exports.CreateInvoiceData = CreateInvoiceData;
const findAll = async () => {
    try {
        // Correctly call the Mongoose 'find()' method to get all users.
        const invoices = await model_1.default.find();
        // Return the array of user documents.
        return invoices;
    }
    catch (error) {
        // Log the error for debugging purposes.
        console.error("Error fetching all users:", error.message);
        // Throw a new error to be handled by the controller.
        throw new Error("Failed to retrieve users: " + error.message);
    }
};
exports.findAll = findAll;
