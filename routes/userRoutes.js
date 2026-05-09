import express from "express";

import {
  registerUser,
  loginUser,
  getUserProfile,
} from "../controllers/userController.js";

import {
  getUsers,
  deleteUser,
  updateUserProfile,
  updateUser,
} from "../controllers/userProfile.js";

import {
  protect,
  admin,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Auth
router.post("/register", registerUser);
router.post("/login", loginUser);

// Logged in user
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

// Admin user management
router
  .route("/")
  .get(protect, admin, getUsers);

router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .put(protect, admin, updateUser);

export default router;