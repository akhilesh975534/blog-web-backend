import express from "express";
import {
  createNewPost,
  deletePost,
  getAllPost,
  updatePost,
} from "../controllers/blog.controllers.js";
const router = express.Router();

router.post("/create-blog", createNewPost);
router.get("/", getAllPost);
router.put("/update-blog/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
