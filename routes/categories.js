import { Router } from 'express';

import Category from '../models/Category.js';

const router = Router();

router.get('/', async (_req, res) => {
    try {
        const categories = await Category.find({}).exec();

        return res.json({ categories });
    } catch (err) {
        console.log('Error on getting categories: ', err);

        return res.status(500).json({ message: 'Failed to get categories' });
    }
});

router.post('/', async (req, res) => {
    const { name, description } = req.body || {};
    if (!name) {
        return res.status(422).json({ message: 'Name is required' });
    }

    try {
        const newCategory = await Category.create({ name, description });

        res.status(201).json({ category: newCategory });
    } catch (err) {
        console.log('Error on adding category: ', err);

        return res.status(500).json({ message: 'Failed to create category' });
    }
});

export default router;