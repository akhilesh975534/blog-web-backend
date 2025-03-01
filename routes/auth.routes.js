import express from "express";
import { signupUser } from "../controllers/auth.controllers.js";
const router = express.Router();

router.post("/create-user", signupUser)

export default router;
