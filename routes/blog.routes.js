import express from "express";
import {
  createNewPost,
  deletePost,
  getAllPost,
  updatePost,
  getSpecificPost,
} from "../controllers/blog.controllers.js";
import { asyncWrap } from "../utils/errorHandler.js";
import Authentication from "../middelwares/auth.middleware.js";
const router = express.Router();

router.use(Authentication)

router.post("/create-blog", asyncWrap(createNewPost));
router.get("/", asyncWrap(getAllPost));
router.get("/:id", asyncWrap(getSpecificPost));
router.put("/update-blog/:id", asyncWrap(updatePost));
router.delete("/:id", asyncWrap(deletePost));

export default router;
