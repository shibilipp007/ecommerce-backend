const slugify = require("slugify");
const { Product } = require("../models/productModel");
const catchAsync = require("../util/catchAsync");
const cloudinary = require("../lib/cloudinary");

const getAllPorducts = catchAsync(async (req, res) => {
  const products = await Product.find({}).populate("category", "title");
  res.json(products);
});

const getProductById = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findById(productId).populate(
    "category",
    "title"
  );
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json(product);
});

const addProduct = catchAsync(async (req, res) => {
  const { title, description, price, quantity, category, images } = req.body;
  if (!images) {
    return res.status(400).json({ message: "Please upload images." });
  }
  let cloudResults = [];
  await Promise.all(
    images.map(async (image) => {
      const cloudResult = await cloudinary.uploader.upload(image);
      cloudResults.push(cloudResult.secure_url);
    })
  );
  const product = new Product({
    title,
    description,
    price,
    quantity,
    images: cloudResults,
    category,
    slug: slugify(title, { lower: true }),
    seller: req.user.userId,
  });
  await product.save();
  res.json(product);
});

const updateProduct = async (req, res) => {
  await Product.findByIdAndUpdate(req.params.productId, req.body, {
    new: true,
  });
  res.json(updateProduct);
};

const deleteProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found. " });
  }
  if (product.seller.toString() !== req.user.userId) {
    return res
      .status(401)
      .json({ message: "You can't delete some's product." });
  }
  await product.deleteOne();
  return res.status(200).json({ message: "Product delete success :(" });
});

module.exports = {
  getAllPorducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
