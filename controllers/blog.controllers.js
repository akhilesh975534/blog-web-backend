import Blog from "../models/blog.model.js";
import ErrorResponse from "../utils/errorHandler.js";

const createNewPost = async (req, res, next) => {
  const { title, des } = req.body;

  if (!title || !des) {
    return next(new ErrorResponse(400, "All fields are required"));
  }

  const post = await Blog.create({
    title,
    des,
  });

  return res
    .status(201)
    .json({ error: false, success: true, message: "New Post  created", post });
};

const getAllPost = async (req, res, next) => {
  const blogs = await Blog.find({});
  if (!blogs) {
    return next(new ErrorResponse(404, "Blog Not found"));
  }

  return res.status(200).json({ success: true, error: false, blogs });
};

const updatePost = async (req, res) => {};

const deletePost = async (req, res) => {};

export { createNewPost, getAllPost, updatePost, deletePost };
