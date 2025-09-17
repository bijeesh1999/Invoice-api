"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOne = exports.findAllProducts = exports.CreateProduct = void 0;
const model_1 = __importDefault(require("../model/model"));
const CreateProduct = async (product) => {
    console.log({ product });
    const newUser = await model_1.default.create({
        name: product.name,
        price: product.price,
    });
    return newUser;
};
exports.CreateProduct = CreateProduct;
const findAllProducts = async () => {
    try {
        // Correctly call the Mongoose 'find()' method to get all users.
        const products = await model_1.default.find({ isDeleted: false });
        // Return the array of user documents.
        return products;
    }
    catch (error) {
        // Log the error for debugging purposes.
        console.error("Error fetching all users:", error.message);
        // Throw a new error to be handled by the controller.
        throw new Error("Failed to retrieve users: " + error.message);
    }
};
exports.findAllProducts = findAllProducts;
const deleteOne = async (id) => {
    const updatedUser = await model_1.default.findByIdAndUpdate(id, {
        $set: {
            isDeleted: true,
        },
    }, {
        new: true, // This option returns the updated document
    });
    // Return the updated user document, or null if the user was not found
    return { customer: updatedUser };
};
exports.deleteOne = deleteOne;
