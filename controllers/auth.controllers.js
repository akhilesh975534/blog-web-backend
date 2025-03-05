import User from "../models/user.model.js";
import ErrorResponse from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";

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

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req?.body;

    const user = await User.findOne({ email });
    if (!user) {
      return next(
        new ErrorResponse(401, "Please Enter valid email and password")
      );
    }

    const checkPassword = await user.comparePassword(password);
    if (!checkPassword) {
      return next(
        new ErrorResponse(401, "Please Enter valid email and password")
      );
    }

    const token = await jwt.sign(
      {
        id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "24h" }
    );

    return res.status(200).json({
      succ: true,
      error: false,
      message: "Successfully login user",
      token,
      user: { username: user.username, email: user.email, role: user.role },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: true, success: false, message: "Internal Server Error" });
  }
};

export { signupUser, loginUser };
