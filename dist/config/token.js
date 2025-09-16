"use strict";
// src/config/jwtConfig.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = exports.jwtSecret = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// It's a best practice to store this in an environment variable
// DO NOT hardcode this in production.
exports.jwtSecret = process.env.JWT_SECRET || 'MY_OWN_AI-PROJECT001/V1-PRIME';
// Function to generate a JWT token
const generateToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, exports.jwtSecret, { expiresIn: '1h' });
};
exports.generateToken = generateToken;
// Function to verify a JWT token
const verifyToken = (token) => {
    try {
        // 1. Verify the token using the secret key
        // 2. Cast the decoded result to our IJwtPayload interface
        const decoded = jsonwebtoken_1.default.verify(token, exports.jwtSecret);
        return decoded;
    }
    catch (error) {
        // If an error occurs (e.g., the token is invalid or expired)
        // return null to indicate failure.
        return null;
    }
};
exports.verifyToken = verifyToken;
