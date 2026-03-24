import { Router } from 'express';

import Product from '../models/Product.js';

const router = Router();

router.get('/', async (req, res) => {
    const { category, sortby, sort = 'asc' } = req.query || {};
    if (sortby && !Object.getOwnPropertyNames(Product.schema.obj).includes(sortby)) {
        return res.status(422).json({ message: 'Cannot sort by a non-existent field' });
    }
    if (sort && !['asc', 'desc'].includes(sort)) {
        return res.status(422).json({ message: 'Incorrect sort value' });
    }

    const filter = {};
    if (category) {
        filter.category = category;
    }

    const query = Product.find(filter);
    if (sortby) {
        query.sort({ [sortby]: sort });
    }

    try {
        const products = await query.exec();

        return res.json({ products });
    } catch (err) {
        return res.status(500).json({ message: 'Failed to get products' });
    }
});

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