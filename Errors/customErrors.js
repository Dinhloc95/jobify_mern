import { StatusCodes } from "http-status-codes";

//code 404
export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NOT FOUND ERROR";
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}
//code 400
export class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = "BadRequestError";
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

//code 403
export class UnAuthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = "UnAuthenticationError";
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}
//code 401
export class UnauthenticatedError extends Error {
  constructor(message) {
    super(message);
    this.name = "UnauthenticatedError";
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}
