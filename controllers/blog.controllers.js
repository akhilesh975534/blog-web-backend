import Blog from "../models/blog.model.js";
import User from "../models/user.model.js";
import ErrorResponse from "../utils/errorHandler.js";

const createNewPost = async (req, res, next) => {
  const { title, des } = req.body;
  const userId = req.userId;
  console.log(userId, "+++++++userId");

  if (!title || !des) {
    return next(new ErrorResponse(400, "All fields are required"));
  }

  const user = await User.findById(userId);
  if (!user) {
    return next(new ErrorResponse(404, "User Not Found"));
  }

  const post = await Blog.create({
    title,
    des,
    user: userId,
  });

  await User.findByIdAndUpdate(userId, { $push: { blogId: post._id } });

  return res
    .status(201)
    .json({ error: false, success: true, message: "New Post  created", post });
};

const getAllPost = async (req, res, next) => {
  const id = req.userId;

  const blogs = await Blog.find({ user: id });
  if (!blogs) {
    return next(new ErrorResponse(404, "Blog Not found"));
  }

  return res.status(200).json({ success: true, error: false, blogs });
};

const getSpecificPost = async (req, res, next) => {
  const { id } = req?.params;

  const blog = await Blog.findById(id);
  if (!blog) {
    return next(new ErrorResponse(400, "Blog Not found"));
  }

  return res.status(200).json({ success: true, error: false, blog });
};

const updatePost = async (req, res, next) => {
  const { id } = req?.params;
  const { title, des } = req?.body;
  if (!title || !des) {
    return next(new ErrorResponse(400, "All fields are required"));
  }

  const blog = await Blog.findByIdAndUpdate(
    id,
    {
      title,
      des,
    },
    { new: true }
  );

  if (!blog) {
    return next(new ErrorResponse(404, "Blog not found"));
  }

  return res.status(200).json({
    success: true,
    error: false,
    message: "Blog Updated Successfully",
    blog,
  });
};

const deletePost = async (req, res, next) => {
  const { id } = req?.params;
  const userId = req.userId;
  // console.log(userId, "+++++++++++++");

  const blog = await Blog.findByIdAndDelete(id);
  if (!blog) {
    return next(new ErrorResponse(404, "Blog not found"));
  }

  await User.findByIdAndUpdate(userId, { $pull: { blogId: id } });

  return res.status(200).json({
    success: true,
    error: false,
    message: "Blog deleted Successfully",
  });
};

export { createNewPost, getAllPost, updatePost, deletePost, getSpecificPost };
