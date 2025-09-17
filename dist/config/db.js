"use strict";
// src/config/db.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Get the connection string from environment variables for security.
// Use a fallback URL for local development if the variable is not set.
const MONGO_URL = process.env.MONGO_URL || "";
console.log({ MONGO_URL: MONGO_URL });
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(MONGO_URL, {
        // These options prevent deprecation warnings from Mongoose
        // useUnifiedTopology: true,
        // useNewUrlParser: true,
        });
        console.log('MongoDB connected successfully!');
    }
    catch (error) {
        console.error('MongoDB connection failed:', error);
        // Exit the process with a failure code
        process.exit(1);
    }
};
exports.connectDB = connectDB;
// Optional: Listen for Mongoose events for better logging and error handling
mongoose_1.default.connection.on('connected', () => {
    console.log('Mongoose default connection open');
});
mongoose_1.default.connection.on('error', (err) => {
    console.log('Mongoose default connection error: ' + err);
});
mongoose_1.default.connection.on('disconnected', () => {
    console.log('Mongoose default connection disconnected');
});
