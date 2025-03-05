import express from "express";
import { loginUser, signupUser } from "../controllers/auth.controllers.js";
const router = express.Router();

router.post("/create-user", signupUser);
router.post("/login", loginUser);

export default router;
