import Product from "../model/model";
import mongoose from "mongoose";


export const CreateProduct = async (product: {
  name: string;
  price:string;
}) => {
  console.log({ product });

  const newUser = await Product.create({
    name: product.name,
    price: product.price
  });

  return newUser;
};


export const findAllProducts = async () => {
  try {
    // Correctly call the Mongoose 'find()' method to get all users.
    const products = await Product.find();

    // Return the array of user documents.
    return products;
  } catch (error: any) {
    // Log the error for debugging purposes.
    console.error("Error fetching all users:", error.message);
    // Throw a new error to be handled by the controller.
    throw new Error("Failed to retrieve users: " + error.message);
  }
};
