import express from "express";

import {
  getRecommendations,
} from "../controllers/analyticsController.js";

const router = express.Router();

// Recommendation route
router.get(
  "/recommendations/:id",
  getRecommendations
);

export default router;