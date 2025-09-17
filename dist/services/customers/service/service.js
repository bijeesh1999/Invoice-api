"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserToken = exports.findAllUsers = exports.findUserByToken = exports.findUserByEmail = exports.findUserById = exports.SignUp = void 0;
const model_1 = __importDefault(require("../model/model"));
const SignUp = async (userData) => {
    console.log({ userData });
    const newUser = await model_1.default.create({
        name: userData.name,
        email: userData.email,
        phone: userData?.phone,
        discount: userData?.discount
    });
    return newUser;
};
exports.SignUp = SignUp;
const findUserById = async (id) => {
    try {
        // The aggregation pipeline starts with a $match stage.
        // This stage filters the documents to only include the one with a matching _id.
        const results = await model_1.default.aggregate([
            {
                $match: {
                    _id: id,
                },
            },
        ]);
        // The aggregate method always returns an array.
        // We return the first element of the array if it exists, otherwise null.
        if (results.length > 0) {
            return results[0];
        }
        else {
            return null;
        }
    }
    catch (error) {
        console.error('Error finding user by ID via aggregation:', error);
        return null;
    }
};
exports.findUserById = findUserById;
const findUserByEmail = async (loginUser) => {
    const user = await model_1.default.findOne({ email: loginUser?.email }).select("+authentication.password +authentication.salt +authentication.token");
    return user;
};
exports.findUserByEmail = findUserByEmail;
const findUserByToken = async (token) => {
    // Ensure the token is a string before querying
    if (typeof token !== "string") {
        console.error("findUserByToken received a non-string token:", token);
        return null; // Return null to indicate failure
    }
    try {
        // Use findOne for better performance when expecting a single result
        const user = await model_1.default.findOne({ "authentication.token": token });
        console.log({ user });
        return user;
    }
    catch (error) {
        console.error("Error finding user by token:", error);
        return null;
    }
};
exports.findUserByToken = findUserByToken;
const findAllUsers = async () => {
    try {
        // Correctly call the Mongoose 'find()' method to get all users.
        const users = await model_1.default.find();
        // Return the array of user documents.
        return users;
    }
    catch (error) {
        // Log the error for debugging purposes.
        console.error("Error fetching all users:", error.message);
        // Throw a new error to be handled by the controller.
        throw new Error("Failed to retrieve users: " + error.message);
    }
};
exports.findAllUsers = findAllUsers;
const updateUserToken = async ({ _id, token, }) => {
    // Correctly use findByIdAndUpdate to update the token field.
    // The second argument is the update document, where you specify the field to update.
    const updatedUser = await model_1.default.findByIdAndUpdate(_id, {
        $set: {
            "authentication.token": token,
        },
    }, {
        new: true, // This option returns the updated document
    });
    // Return the updated user document, or null if the user was not found
    // return { token: updatedUser?.authentication?.token };
};
exports.updateUserToken = updateUserToken;
