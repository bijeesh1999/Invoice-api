import Invoice from "../model/model";
import mongoose from "mongoose";

export const CreateInvoiceData = async (invoice: any) => {
  console.log({ invoice });

  const newUser = await Invoice.create(invoice);
  return newUser;
};

export const findAll = async () => {
  try {
    // Correctly call the Mongoose 'find()' method to get all users.
    const invoices = await Invoice.find();
    // Return the array of user documents.
    return invoices;
  } catch (error: any) {
    // Log the error for debugging purposes.
    console.error("Error fetching all users:", error.message);
    // Throw a new error to be handled by the controller.
    throw new Error("Failed to retrieve users: " + error.message);
  }
};
