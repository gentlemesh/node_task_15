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
        type: String,
        required: true,
    },
});

const Product = mongoose.model('Product', productSchema);

export default Product;