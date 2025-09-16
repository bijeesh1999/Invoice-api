"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const token_1 = require("../config/token");
const service_1 = require("../services/customers/service/service");
const mongoose_1 = __importDefault(require("mongoose"));
const authMiddleware = async (req, res, next) => {
    try {
        const TOKEN = req.cookies.USER_TOKEN || req.headers.authorization?.split(' ')[1];
        if (!TOKEN) {
            return res.status(401).json({
                message: "Authentication failed: No token provided.",
            });
        }
        // 1. First, verify the token to ensure it's valid and not expired.
        const decodedPayload = (0, token_1.verifyToken)(TOKEN);
        if (!decodedPayload) {
            return res.status(401).json({ message: "Authentication failed: Invalid or expired token." });
        }
        console.log({ decodedPayload });
        // 2. Use the user ID from the decoded token to find the user in the database.
        const user = await (0, service_1.findUserById)(new mongoose_1.default.Types.ObjectId(decodedPayload.id));
        if (!user) {
            return res.status(401).json({ message: "Authentication failed: User not found." });
        }
        console.log({ user });
        // 3. Attach the user object to the request for subsequent middleware/route handlers.
        req.user = user;
        // 4. Proceed to the next middleware or route handler.
        next();
    }
    catch (error) {
        console.error("Authentication failed:", error.message);
        return res.status(401).json({ message: "Authentication failed: Unauthorized." });
    }
};
exports.authMiddleware = authMiddleware;
