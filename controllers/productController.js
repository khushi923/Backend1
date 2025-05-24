const Product = require('../models/productsmodel');

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    console.log('Fetching all products...');
    const products = await Product.find();
    console.log('products',products)
    console.log(`Found ${products.length} products:`, products);
    res.json({ success: true, products });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Search products
exports.searchProducts = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.json({ success: true, products: [] });
    }

    const searchRegex = new RegExp(query, 'i');
    const products = await Product.find({
      $or: [
        { productname: searchRegex },
        { description: searchRegex },
        { category: searchRegex }
      ]
    });

    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get products by category
exports.getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    console.log(`Fetching products for category: ${category}`);
    const products = await Product.find({ 
      category: new RegExp('^' + category + '$', 'i')  // Case-insensitive exact match
    });
    console.log(`Found ${products.length} products in category ${category}`);
    res.json({ success: true, products });
  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Add a new product
exports.addProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ success: true, product });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    res.json({ success: true, product });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
}; 