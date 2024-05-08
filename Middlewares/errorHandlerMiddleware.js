import { StatusCodes } from "http-status-codes";

const ErrorMiddleware = (err, req, res, next) => {
  console.log(err);
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const msg = err.message || `Something Went Wrong, Try again later !`;
  return res.status(statusCode).json({ msg });
};

export default ErrorMiddleware;
