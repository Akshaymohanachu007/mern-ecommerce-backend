import express from "express";

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

// Admin get all users
router.get("/", protect, admin, getUsers);

// Update logged in user profile
router.put("/profile", protect, updateUserProfile);

// Admin delete user
router.delete("/:id", protect, admin, deleteUser);

// Admin update user
router.put("/:id", protect, admin, updateUser);

export default router;