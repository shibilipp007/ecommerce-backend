const path = require("path");
const Category = require("../models/categoryModel");
const catchAsync = require("../util/catchAsync");
const cloudinary = require("../lib/cloudinary");

const getAllcategory = async (req, res) => {
  const categories = await Category.find({});
  res.json(categories);
};

const getCatById = async (req, res) => {
  const category = await Category.findById(req.params.id);
  res.json(category);
};

const addCategory = catchAsync(async (req, res) => {
  const { title, image } = req.body;
  const cloudResult = await cloudinary.uploader.upload(image);
  const category = new Category({
    title,
    image: cloudResult.secure_url,
  });
  await category.save();
  res.json(category);
});

const deleteCategory = catchAsync(async (req, res) => {
  const categoryId = req.params.categoryId;
  const category = await Category.findById(categoryId);
  if (!category) return res.sendStatus(403);
  await category.deleteOne();
  res.status(200).json({ message: "Category deleted success :)" });
});

module.exports = {
  getAllcategory,
  getCatById,
  addCategory,
  deleteCategory,
};
