/**
 * Contains definitions for middleware functions. These functions should not be
 * called explicitly, since they will be called automatically by Express.
 */
const Middlewares = {
  /**
   * A middleware function to handle errors.
   *
   * @param {Error} err The error type.
   * @param {Request} req The Express request object.
   * @param {Response} res The Express response object.
   * @param {import("express").NextFunction} next The Express NextFunction to
   * call.
   *
   * @returns An error object with a `message` and `stack` property. The message
   * describes the error and the stack will display a stacktrace depending on the
   * environment.
   */
  errorHandler(err, _req, res, _next) {
    // In Express, the default status code is 200. Since this handler will be
    // invoked automatically by Express when an error is caught, status codes
    // of incoming responses will be set to be 500 if they are found to be 200.
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode);

    console.log("In middleware");

    console.log(err.message);

    const responseBody = {
      message: err.message,
      stack: process.env.NODE_ENV === "production" ? "[hidden]" : err.stack,
    };

    return res.json(responseBody);
  },
};

module.exports = Middlewares;
