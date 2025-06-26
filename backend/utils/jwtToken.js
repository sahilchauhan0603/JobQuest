export const sendToken = (user, statusCode, res, message) => {
  const token = user.getJWTToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    sameSite: 'None', // Required for cross-origin cookies
    secure: true      // Required for sameSite: 'None'
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    message,
    token,
  });
};
