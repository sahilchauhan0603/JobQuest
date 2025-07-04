export const catchAsyncErrors = (theFunction) => {
  return (req, res, next) => {
    Promise.resolve(theFunction(req, res, next)).catch(next);
  };
};
// This middleware catches errors from async functions and passes them to the next error handler
// It ensures that any errors thrown in async functions are handled properly
// This is useful for avoiding unhandled promise rejections in Express applications
// Usage: Wrap your async route handlers with catchAsyncErrors to handle errors gracefully
// Example: app.get('/route', catchAsyncErrors(async (req, res) => {
//   // Your async code here
// }));