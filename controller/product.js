const Product = require("../model/product");

// CREATE
exports.createProduct = async (req, res) => {
  try {
    console.log(req.body); // 👈 ADD THIS
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// READ ALL
exports.getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

// READ ONE
exports.getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
};

// UPDATE (PATCH)
exports.updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(product);
};

// REPLACE (PUT)
exports.replaceProduct = async (req, res) => {
  const product = await Product.findOneAndReplace(
    { _id: req.params.id },
    req.body,
    { new: true }
  );
  res.json(product);
};

// DELETE
exports.deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  res.json(product);
};
