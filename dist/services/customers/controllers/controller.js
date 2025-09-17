"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCustomer = exports.findAll = exports.userSignUp = void 0;
const service_1 = require("../service/service");
const userSignUp = async (req, res) => {
    try {
        const userData = req.body;
        const newUser = await (0, service_1.SignUp)({
            ...userData,
        });
        // Respond with a success message and the newly created user data
        return res.status(201).json({
            message: "Customer creation successfully!",
            user: { newUser },
        });
    }
    catch (error) {
        // Log the full error for debugging
        console.error("Customer creation:", error.message);
        // Send a more detailed error message to the client
        return res.status(500).json({
            message: "Customer creation failed............",
            error: error.message,
        });
    }
};
exports.userSignUp = userSignUp;
const findAll = async (req, res) => {
    try {
        const users = await (0, service_1.findAllUsers)();
        const user = req.user;
        return res.status(200).json({
            users,
            user,
            message: "find All Users",
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.findAll = findAll;
const deleteCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteResponse = await (0, service_1.deleteOne)(id);
        return res.status(200).json({
            response: deleteResponse,
            message: "User deleted",
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.deleteCustomer = deleteCustomer;
