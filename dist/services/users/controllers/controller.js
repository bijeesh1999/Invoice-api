"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSignUp = void 0;
const service_1 = require("../service/service");
const userSignUp = async (req, res) => {
    try {
        const userData = req.body;
        // Pass the user data to the service layer for processing
        const newUser = await (0, service_1.SignUp)(userData);
        // Respond with a success message and the newly created user data
        return res.status(201).json({
            message: 'User signed up successfully!',
            user: newUser
        });
    }
    catch (error) {
        // Log the full error for debugging
        console.error('User signup failed:', error.message);
        // Send a more detailed error message to the client
        return res.status(500).json({
            message: 'User signup failed',
            error: error.message
        });
    }
};
exports.userSignUp = userSignUp;
