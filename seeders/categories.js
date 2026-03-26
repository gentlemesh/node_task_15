import Category from '../models/Category.js';

import connectDB from '../db/connect.js';

async function seedCategories() {
    await connectDB();

    const categoriesCount = await Category.estimatedDocumentCount();
    if (categoriesCount > 0) {
        const result = await Category.deleteMany({});
        console.log(`${result.deletedCount} documents deleted`);
    }

    await Category.create([{
        name: 'Electronics',
        description: 'Electronic devices and gadgets',
    }, {
        name: 'Books',
        description: 'Printed and digital books',
    }]);
}

seedCategories().then(() => {
    console.log('Categories seeding completed');
    process.exit(0);
}).catch(err => {
    console.error('Error seeding categories: ', err);
    process.exit(1);
});