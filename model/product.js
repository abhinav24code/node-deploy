const mongoose = require("mongoose");
const { Schema } = mongoose;

//Schema
const productSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: {
    type: Number,
    required: true,
    min: [0, "wrong min price"],
    required: true,
  },
  discountPercentage: {
    type: Number,
    min: [0, "wrong min discount"],
    max: [50, "wrong max discount"],
  },
  rating: {
    type: Number,
    min: [0, "wrong min rating"],
    max: [5, "wrong max rating"],
    default: 0,
  },
  stock: Number,
  brand: { type: String, required: true },
  category: { type: String, required: true },
  thumbnail: { type: String, required: true },
  images: [String],
});

// ✅ Safe model export
const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

module.exports = Product;
