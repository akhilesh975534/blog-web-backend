class ErrorResponse extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }
}

export const asyncWrap = (fn) => {
  return function (req, res, next) {
    return fn(req, res, next).catch((error) => {
      // console.log(error, "+++++++++++++++++");
      next(error);
    });
  };
};

export default ErrorResponse;
