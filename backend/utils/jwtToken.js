// Utility function to send JWT token in cookie and response
export const sendToken = (user, statusCode, res, message) => {
  // Generate JWT token using user instance method
  const token = user.getJWTToken();
  // Cookie options for security and expiry
  const options = {
    expires: new Date(                    //   day  min   sec  miliseconds
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000 // Set cookie expiry - 1 day
    ),
    httpOnly: true,   // Prevent client-side JS from accessing the cookie
    sameSite: 'None', // Allow cross-origin cookies (for secure contexts)
    secure: true      // Cookie only sent over HTTPS
  };

  // Set cookie and send JSON response with token and user info
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    message,
    token,
  });
};
