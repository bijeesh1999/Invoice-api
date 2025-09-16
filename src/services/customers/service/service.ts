import Customer from "../model/model";
import mongoose from "mongoose";


export const SignUp = async (userData: {
  name: string;
  email: string;
  phone:string;
}) => {
  console.log({ userData });

  const newUser = await Customer.create({
    name: userData.name,
    email: userData.email,
    phone:userData?.phone,
  });

  return newUser;
};

export const findUserById = async (id: mongoose.Types.ObjectId) => {
  try {
    // The aggregation pipeline starts with a $match stage.
    // This stage filters the documents to only include the one with a matching _id.
    const results = await Customer.aggregate([
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
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error finding user by ID via aggregation:', error);
    return null;
  }
};


export const findUserByEmail = async (loginUser: { email: String }) => {
  const user = await Customer.findOne({ email: loginUser?.email }).select(
    "+authentication.password +authentication.salt +authentication.token"
  );

  return user;
};

export const findUserByToken = async (token: string) => {
  // Ensure the token is a string before querying
  if (typeof token !== "string") {
    console.error("findUserByToken received a non-string token:", token);
    return null; // Return null to indicate failure
  }

  try {
    // Use findOne for better performance when expecting a single result
    const user = await Customer.findOne({ "authentication.token": token });
    console.log({ user });
    return user;
  } catch (error) {
    console.error("Error finding user by token:", error);
    return null;
  }
};

export const findAllUsers = async () => {
  try {
    // Correctly call the Mongoose 'find()' method to get all users.
    const users = await Customer.find();

    // Return the array of user documents.
    return users;
  } catch (error: any) {
    // Log the error for debugging purposes.
    console.error("Error fetching all users:", error.message);
    // Throw a new error to be handled by the controller.
    throw new Error("Failed to retrieve users: " + error.message);
  }
};

export const updateUserToken = async ({
  _id,
  token,
}: {
  _id: mongoose.Types.ObjectId;
  token: string;
}) => {
  // Correctly use findByIdAndUpdate to update the token field.
  // The second argument is the update document, where you specify the field to update.
  const updatedUser = await Customer.findByIdAndUpdate(
    _id,
    {
      $set: {
        "authentication.token": token,
      },
    },
    {
      new: true, // This option returns the updated document
    }
  );

  // Return the updated user document, or null if the user was not found
  // return { token: updatedUser?.authentication?.token };
};
