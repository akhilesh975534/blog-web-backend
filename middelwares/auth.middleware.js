import ErrorResponse from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";

const Authentication = async (req, res, next) => {
  const headers = req?.headers["authorization"];
  const token = headers?.split(" ")[1];

  if (!token) {
    return next(new ErrorResponse(401, "User Unanthorized"));
  }

  const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY, {
    expiredIn: "24h",
  });
  
  if(!decode.id) {
    return next(new ErrorResponse(401, "User Unanthorized"))
  }

  req.userId = decode.id;

  next();
  
};

export default Authentication;
