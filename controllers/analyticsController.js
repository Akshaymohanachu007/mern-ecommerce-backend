import Product from "../models/Product.js";

// @desc Get product recommendations
// @route GET /api/analytics/recommendations/:id
// @access Public

export const getRecommendations = async (req, res) => {
  try {
    // Current product
    const currentProduct = await Product.findById(
      req.params.id
    );

    // Check if product exists
    if (!currentProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // Find similar category products
    const recommendations = await Product.find({
      category: currentProduct.category,

      // Exclude current product
      _id: { $ne: currentProduct._id },
    })

      // Highest rated first
      .sort({ rating: -1 })

      // Limit recommendations
      .limit(4);

    res.json(recommendations);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};