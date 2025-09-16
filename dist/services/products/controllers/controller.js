"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllProduct = exports.createProducts = void 0;
const service_1 = require("../service/service");
const createProducts = async (req, res) => {
    try {
        const product = req.body;
        const newProduct = await (0, service_1.CreateProduct)({
            ...product,
        });
        // Respond with a success message and the newly created user data
        return res.status(201).json({
            message: "Product creation successfully!",
            Product: { newProduct },
        });
    }
    catch (error) {
        // Log the full error for debugging
        console.error("Product creation error:", error.message);
        // Send a more detailed error message to the client
        return res.status(500).json({
            message: "Product creation failed............",
            error: error.message,
        });
    }
};
exports.createProducts = createProducts;
const findAllProduct = async (req, res) => {
    try {
        const products = await (0, service_1.findAllProducts)();
        return res.status(200).json({
            products,
            message: "find All Products success",
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.findAllProduct = findAllProduct;
