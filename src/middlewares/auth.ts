import { Request, Response, NextFunction } from "express";
import { verifyToken, JwtPayload } from "../config/token";
import { findUserById } from "../services/customers/service/service";
import mongoose from "mongoose";

// Extend the Request interface to add a 'user' property
interface AuthenticatedRequest extends Request {
  user?: any;
}

export const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const TOKEN = req.cookies.USER_TOKEN || req.headers.authorization?.split(' ')[1];

    if (!TOKEN) {
      return res.status(401).json({
        message: "Authentication failed: No token provided.",
      });
    }    

    // 1. First, verify the token to ensure it's valid and not expired.
    const decodedPayload = verifyToken(TOKEN) as JwtPayload;

    if (!decodedPayload) {
      return res.status(401).json({ message: "Authentication failed: Invalid or expired token." });
    }

      console.log({decodedPayload});
      

    // 2. Use the user ID from the decoded token to find the user in the database.
    const user = await findUserById(new mongoose.Types.ObjectId(decodedPayload.id));
    
    if (!user) {
      return res.status(401).json({ message: "Authentication failed: User not found." });
    }

    console.log({user});
    

    // 3. Attach the user object to the request for subsequent middleware/route handlers.
    req.user = user;
    
    // 4. Proceed to the next middleware or route handler.
    next();
  } catch (error: any) {
    console.error("Authentication failed:", error.message);
    return res.status(401).json({ message: "Authentication failed: Unauthorized." });
  }
}