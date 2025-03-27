import User from "../models/user.model.js";
import ErrorResponse from "../utils/errorHandler.js";

const getProfile = async (req, res, next) => {
  const { id } = req.params;
  console.log(id, "id+++++++++++++++");

  const user = await User.findById(id);
  if (!user) {
    return next(new ErrorResponse(404, "User Not found"));
  }

  return res.status(200).json({ success: true, error: false, user });
};

const updateProfile = async (req, res, next) => {
  const id = req.params;
};

export { getProfile, updateProfile };
