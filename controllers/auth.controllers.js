import User from "../models/user.model.js";

const signupUser = async (req, res) => {
  const { name, username, email, password, mobileNo, role } = req?.body;
  //   console.log(req.body)
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
};

export { signupUser };
