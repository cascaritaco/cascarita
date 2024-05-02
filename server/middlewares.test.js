const httpMock = require("node-mocks-http");
const Middlewares = require("./middlewares");

describe("Error handler middleware", () => {
  it("Errors with no status codes should fallback to 500", () => {
    let err = {
      message: "expected foo, got bar.",
      stack: "at /some/file.js 0:4 at ...\n",
    };
    let req = httpMock.createRequest();
    let res = httpMock.createResponse();
    let next = jest.fn();

    Middlewares.errorHandler(err, req, res, next);
    expect(res.statusCode).toEqual(500);
  });

  it("Errors with explicit status codes are respected", () => {
    let err = {
      message: "expected foo, got bar.",
      stack: "at /some/file.js 0:4 at ...\n",
    };
    let req = httpMock.createRequest();
    let res = httpMock.createResponse();
    res.status(401);
    let next = jest.fn();

    Middlewares.errorHandler(err, req, res, next);
    expect(res.statusCode).toEqual(401);
  });
});
