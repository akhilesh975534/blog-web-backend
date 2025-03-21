import express from "express";
import { loginUser, signupUser } from "../controllers/auth.controllers.js";
import { asyncWrap } from "../utils/errorHandler.js";
const router = express.Router();

router.post("/create-user", asyncWrap(signupUser));
router.post("/login", asyncWrap(loginUser));

export default router;
