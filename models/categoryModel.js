const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
});

// categorySchema.methods.toJSON = function () {
//   const category = this.toObject();
//   return {
//     ...category,
//     image: `${process.env.SERVER}/uploads/${category.image}`,
//   };
// };

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
