import express from "express";
const router = express.Router();

import rateLimiter from "express-rate-limit";

import { register, login, updateUser, getVerificationCode } from "../controllers/authController.js";
import authenticateUser from "../middleware/auth.js";

//Limit 100 request per 15 minutes for a user
const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: "Too many requests from this IP, please try again after 15 minutes",
});

router.route("/getVerificationCode").post(apiLimiter, getVerificationCode);
router.route("/register").post(apiLimiter, register);
router.route("/login").post(apiLimiter, login);
router.route("/updateUser").patch(authenticateUser, updateUser);

export default router;
