import Product from "../models/Product.js";

// @desc Fetch all products
// @route GET /api/products
export const getProducts = async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};

    const category = req.query.category
      ? { category: req.query.category }
      : {};

    let sortOption = {};

    if (req.query.sort === "low") {
      sortOption = { price: 1 };
    } else if (req.query.sort === "high") {
      sortOption = { price: -1 };
    }

    const products = await Product.find({
      ...keyword,
      ...category,
    }).sort(sortOption);

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// @desc Fetch single product
// @route GET /api/products/:id
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({
        message: "Product not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// @desc Create product
// @route POST /api/products
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      image,
      brand,
      category,
      description,
      price,
      countInStock,
    } = req.body;

    const product = new Product({
      user: req.user._id,
      name,
      image,
      brand,
      category,
      description,
      price,
      countInStock,
    });

    const createdProduct = await product.save();

    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// @desc Update product
// @route PUT /api/products/:id
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = req.body.name || product.name;
      product.image = req.body.image || product.image;
      product.brand = req.body.brand || product.brand;
      product.category = req.body.category || product.category;
      product.description =
        req.body.description || product.description;
      product.price = req.body.price || product.price;
      product.countInStock =
        req.body.countInStock || product.countInStock;

      const updatedProduct = await product.save();

      res.json(updatedProduct);
    } else {
      res.status(404).json({
        message: "Product not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// @desc Delete product
// @route DELETE /api/products/:id
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.deleteOne();

      res.json({
        message: "Product removed",
      });
    } else {
      res.status(404).json({
        message: "Product not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};