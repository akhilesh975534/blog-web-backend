import User from "../models/user.model.js";
import ErrorResponse from "../utils/errorHandler.js";

const signupUser = async (req, res, next) => {
  try {
    const { name, username, email, password, mobileNo, role } = req?.body;
    //   console.log(req.body)
    if (!name || !username || !email || !password || !mobileNo) {
      return next(new ErrorResponse(400, "All fields are required"));
    }

    const existEmail = await User.findOne({ email });
    if (existEmail) {
      return next(new ErrorResponse(400, "email already exists"));
    }

    const existUsername = await User.findOne({ username });
    if (existUsername) {
      return next(new ErrorResponse(400, "Username already exists"));
    }

    const user = await User.create({
      name,
      username,
      email,
      mobileNo,
      password,
      role,
    });

    return res.status(201).json({
      success: true,
      error: false,
      message: "Successfully New user created",
      user,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, success: false, message: "Internal Server Error" });
  }
};

export { signupUser };
