// Custom error handler class extending the default Error class
class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message); // Call parent constructor with message
    this.statusCode = statusCode; // Attach status code to error
  }
}

// Express middleware to handle errors centrally
export const errorMiddleware = (err, req, res, next) => {
  // Set default status code and message if not provided
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server error.";

  // Handle invalid MongoDB ObjectId errors
  if (err.name === "CastError") {
    const message = `Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }
  // Handle duplicate key errors (e.g., unique fields)
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered.`;
    err = new ErrorHandler(message, 400);
  }
  // Handle invalid JWT errors
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid, Try again.`;
    err = new ErrorHandler(message, 400);
  }
  // Handle expired JWT errors
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is expired, Try again.`;
    err = new ErrorHandler(message, 400);
  }

  // Send error response as JSON
  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

// Export the custom error handler class as default
export default ErrorHandler

