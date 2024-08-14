const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    age: Number,
    email: {
        type: String,
        unique: true
    },
    password: String,
    role: {
        type: String,
        enum: ["user", "premium", "admin"]
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart"
    },
    documents: {
        type: [
            {
                documentId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Document"
                }
            }
        ]
    },
    last_connection: Date,
    id_loaded: Boolean,
    dom_loaded: Boolean,
    account_loaded: Boolean
})

schema.pre('find', function(){
    this.populate('cart')
    this.populate('documents')
})

schema.pre('findOne', function(){
    this.populate('cart')
    this.populate('documents')
})

schema.virtual('id').get(function (){
    return this._id.toString()
})

module.exports = mongoose.model('User', schema, 'users')