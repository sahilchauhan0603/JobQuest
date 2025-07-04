import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";

// Middleware to check if the user is authenticated
// Uses JWT token from cookies to verify user identity
export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies; // Get token from cookies
  if (!token) {
    // If no token, user is not authenticated
    return next(new ErrorHandler("User is not authenticated.", 400));
  }
  // Verify token using secret key
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  // Fetch user from database and attach to req.user
  req.user = await User.findById(decoded.id);

  next(); // Proceed to next middleware
});

// Middleware to check if the user is authorized to access a resource
// Accepts allowed roles as arguments
export const isAuthorized = (...roles) => {  // Higher order function to accept roles
  return (req, res, next) => {
    // Check if user's role is included in allowed roles
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `${req.user.role} not allowed to access this resource.`
        )
      );
    }
    next(); // Proceed if authorized
  };
};


