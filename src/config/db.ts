// src/config/db.ts

import mongoose from 'mongoose';
import dotenv from "dotenv"
dotenv.config();


// Get the connection string from environment variables for security.
// Use a fallback URL for local development if the variable is not set.
const MONGO_URL = process.env.MONGO_URL|| ""

console.log({MONGO_URL:MONGO_URL})

export const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(MONGO_URL, {
            // These options prevent deprecation warnings from Mongoose
            // useUnifiedTopology: true,
            // useNewUrlParser: true,
        });
        console.log('MongoDB connected successfully!');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        // Exit the process with a failure code
        process.exit(1);
    }
};

// Optional: Listen for Mongoose events for better logging and error handling
mongoose.connection.on('connected', () => {
    console.log('Mongoose default connection open');
});

mongoose.connection.on('error', (err) => {
    console.log('Mongoose default connection error: ' + err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose default connection disconnected');
});