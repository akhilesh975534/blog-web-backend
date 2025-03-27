import express from "express";
import { asyncWrap } from "../utils/errorHandler.js";
import Authentication from "../middelwares/auth.middleware.js";
import { getProfile, updateProfile } from "../controllers/user.controller.js";
const router = express.Router();

router.use(Authentication)

router.get("/:id", asyncWrap(getProfile))
router.put("/update-blog/:id", asyncWrap(updateProfile));


export default router;
