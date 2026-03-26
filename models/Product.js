import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: mongoose.Schema.Types.Double,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
}, {
    versionKey: false,
});

const Product = mongoose.model('Product', productSchema);

export default Product;