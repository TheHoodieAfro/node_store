import Product from '../models/product.model'

class ProductService {

    async getProducts() {
        try {
            const product = await Product.find({})
            return product
        }catch (error) {
            throw new Error(error)
        }
    }

    async findProductById(id) {
        try {
            const product = await Product.findOne({_id: id})
            return product
        }catch (error) {
            throw new Error(error)
        }
    }

    async createProduct(input) {
        try {
            const product = await Product.create(input)
            return product.toJSON()
        } catch (error) {
            throw new Error(error)
        }
    }
    
    async updateProduct(id, input) {
        try {
            const product = await Product.findOneAndUpdate({_id: id}, input, {new: true})
            return product?.toJSON()
        } catch (error) {
            throw new Error(error)
        }
    }

    async deleteProduct(id) {
        try {
            const product = await Product.deleteOne({_id: id})
            return product
        }catch (error) {
            throw new Error(error)
        }
    }
}

export default new ProductService()