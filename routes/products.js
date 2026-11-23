
const express = require('express');
const router = express.Router();

// Connect to SQLite database
const db = require('../db');

// GET all products
router.get('/', (req, res) => {
    try {
        const { category, maxPrice, sort } = req.query;

        let result = db.prepare(
            'SELECT id, name, price, category, stock, image AS img FROM products'
        ).all();

        // Filter by category
        if (category) {
            result = result.filter(p => p.category === category);
        }

        // Filter by maximum price
        if (maxPrice !== undefined) {
            const price = Number(maxPrice);

            if (!Number.isFinite(price)) {
                return res.status(400).json({
                    message: 'Invalid maxPrice'
                });
            }

            result = result.filter(p => p.price <= price);
        }

        // Sort products
        if (sort === 'price') {
            result.sort((a, b) => a.price - b.price);
        }

        if (sort === 'name') {
            result.sort((a, b) => a.name.localeCompare(b.name));
        }

        res.json(result);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Failed to retrieve products'
        });
    }
});

// GET one product by ID
router.get('/:id', (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id < 1) {
            return res.status(400).json({
                message: 'ID must be a whole number'
            });
        }

        const product = db.prepare(
            'SELECT id, name, price, category, stock, image AS img FROM products WHERE id = ?'
        ).get(id);

        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        res.json(product);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Failed to retrieve product'
        });
    }
});

// ADD a new product
router.post('/', (req, res) => {
    try {
        const { name, price, category, stock = 0, img } = req.body ?? {};

        if (typeof name !== 'string' || name.trim() === '') {
            return res.status(400).json({
                error: 'Name is required'
            });
        }

        if (typeof price !== 'number' || !Number.isFinite(price) || price < 0) {
            return res.status(400).json({
                error: 'Price must be a valid positive number'
            });
        }

        if (typeof category !== 'string' || category.trim() === '') {
            return res.status(400).json({
                error: 'Category is required'
            });
        }

        if (!Number.isInteger(stock) || stock < 0) {
            return res.status(400).json({
                error: 'Stock must be a whole number of 0 or more'
            });
        }

        const result = db.prepare(`
            INSERT INTO products (name, price, category, stock, image)
            VALUES (?, ?, ?, ?, ?)
        `).run(
            name.trim(),
            price,
            category.trim(),
            stock,
            img || null
        );

        const product = db.prepare(
            'SELECT id, name, price, category, stock, image AS img FROM products WHERE id = ?'
        ).get(result.lastInsertRowid);

        res.status(201).json(product);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Failed to add product'
        });
    }
});

module.exports = router;