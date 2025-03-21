import ErrorResponse from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";

const Authentication = async (req, res, next) => {
  const headers = req?.headers["authorization"];
  // console.log(headers,"++++++++++++")
  const token = headers?.split(" ")[1];
  // console.log(token,"token++++++++++++")

  if (!token) {
    return next(new ErrorResponse(403, "User Unanthorized"));
  }

  const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY, {
    expiredIn: "24h",
  });
  console.log(decode,"+++++++++++++")
  req.userId = decode.id;

  next();
  
  if(!decode.id) {
    return next(new ErrorResponse(403, "User Unanthorized"))
  }

  console.log(decode.id)
};

export default Authentication;
