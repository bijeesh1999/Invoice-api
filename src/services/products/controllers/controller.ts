import { Request, response, Response } from "express";
import {
  findAllProducts,CreateProduct,
  deleteOne
} from "../service/service";

interface AuthenticatedRequest extends Request {
  Product?: any;
}

export const createProducts = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const product = req.body;
    const newProduct = await CreateProduct({
      ...product,
    });
    // Respond with a success message and the newly created user data
    return res.status(201).json({
      message: "Product creation successfully!",
      Product: { newProduct },
    });
  } catch (error: any) {
    // Log the full error for debugging
    console.error("Product creation error:", error.message);
    // Send a more detailed error message to the client
    return res.status(500).json({
      message: "Product creation failed............",
      error: error.message,
    });
  }
};



export const findAllProduct = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const products = await findAllProducts();
    return res.status(200).json({
      products,
      message: "find All Products success",
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const {id} = req.params;

    const deleteResponse = await deleteOne(id)

    return res.status(200).json({
      response:deleteResponse,
      message: "Product deleted",
    });
  } catch (error) {
    console.log(error);
  }
};

