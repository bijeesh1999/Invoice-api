import { Request, response, Response } from "express";
import {
  findAllUsers,
  SignUp,
} from "../service/service";

interface AuthenticatedRequest extends Request {
  user?: any;
}

export const userSignUp = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const userData = req.body;
    const newUser = await SignUp({
      ...userData,
    });
    // Respond with a success message and the newly created user data
    return res.status(201).json({
      message: "Customer creation successfully!",
      user: { newUser },
    });
  } catch (error: any) {
    // Log the full error for debugging
    console.error("Customer creation:", error.message);
    // Send a more detailed error message to the client
    return res.status(500).json({
      message: "Customer creation failed............",
      error: error.message,
    });
  }
};


export const findAll = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const users = await findAllUsers();
    const user = req.user;

    return res.status(200).json({
      users,
      user,
      message: "find All Users",
    });
  } catch (error) {
    console.log(error);
  }
};

