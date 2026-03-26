import Category from '../models/Category.js';
import Product from '../models/Product.js';

import connectDB from '../db/connect.js';

async function seedProducts() {
    await connectDB();

    const categoriesCount = await Product.estimatedDocumentCount();
    if (categoriesCount > 0) {
        const result = await Product.deleteMany({});
        console.log(`${result.deletedCount} documents deleted`);
    }

    const categories = await Category.find().exec();
    const categoriesMap = categories.reduce((acc, cat) => {
        acc[cat.name] = cat._id;
        return acc;
    }, {});

    await Product.create([{
        name: 'Laptop',
        price: 999.99,
        category: categoriesMap.Electronics,
    }, {
        name: 'JavaScript Guide',
        price: 29.99,
        category: categoriesMap.Books,
    }]);
}

seedProducts().then(() => {
    console.log('Products seeding completed');
    process.exit(0);
}).catch(err => {
    console.error('Error seeding products: ', err);
    process.exit(1);
});