import { Router } from 'express';

import Product from '../models/Product.js';

const router = Router();

router.post('/', async (req, res) => {
    const { name, price, category } = req.body || {};
    if (!name) {
        return res.status(422).json({ message: 'Name is required' });
    }
    if (!category) {
        return res.status(422).json({ message: 'Category is required' });
    }

    try {
        const newProduct = await Product.create({ name, price, category });

        res.status(201).json({ product: newProduct });
    } catch (err) {
        console.log(err);

        return res.status(400).json({ message: 'Failed to create product' });
    }
});

export default router;