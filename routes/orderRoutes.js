import express from "express";

import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToDelivered,
  getOrders,
} from "../controllers/orderController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create order
router.post("/", protect, addOrderItems);

// Logged in user orders
router.get("/myorders", protect, getMyOrders);

// Admin get all orders
router.get("/", protect, admin, getOrders);

// Get order by id
router.get("/:id", protect, getOrderById);

// Admin deliver order
router.put(
  "/:id/deliver",
  protect,
  admin,
  updateOrderToDelivered
);

export default router;