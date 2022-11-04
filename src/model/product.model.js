import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String},
    quantity: {type: Number, required: true},
    brand: {type: String, required: true},
    owner: {type: Number, required: true},
}, {
    timestamps: true
})

const Product = mongoose.model('Product', productSchema);

export default Product;