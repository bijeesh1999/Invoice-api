import { Request, response, Response } from "express";
import {
  CreateInvoiceData,
  deleteOne,
  findAll
} from "../service/service";

interface AuthenticatedRequest extends Request {
  Product?: any;
}

export const createInvoice = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const invoice = req.body;
    const newProduct = await CreateInvoiceData({
      ...invoice,
    });
    // Respond with a success message and the newly created user data
    return res.status(201).json({
      message: "Invoice creation successfully!",
      Product: { newProduct },
    });
  } catch (error: any) {
    // Log the full error for debugging
    console.error("Invoice creation error:", error.message);
    // Send a more detailed error message to the client
    return res.status(500).json({
      message: "Invoice creation failed............",
      error: error.message,
    });
  }
};



export const findAllInvoice = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const invoices = await findAll();
    return res.status(200).json({
      invoices,
      message: "find All Invoices success",
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteInvoice = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const {id} = req.params;

    const deleteResponse = await deleteOne(id)

    return res.status(200).json({
      response:deleteResponse,
      message: "Invoice deleted",
    });
  } catch (error) {
    console.log(error);
  }
};

