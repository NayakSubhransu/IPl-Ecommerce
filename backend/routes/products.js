const express = require('express');
const Product = require('../models/product');
const router = express.Router();

// Get Products
router.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch products" });
    }
});

module.exports = router;
