const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    products: {
        type: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product"
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }
        ],
        default: []
    }
})

schema.pre('find', function(){
    this.populate('products.productId')
})

// schema.pre('findById', function(){
//     this.populate('products.productId')
// })

module.exports = mongoose.model('Cart', schema, 'carts')