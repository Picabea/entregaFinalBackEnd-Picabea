const mongoose = require('mongoose')
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const schema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    thumbnail:{
        type: String,
        required: true
    },
    code:{
        type: String,
        required: true,
        unique: true
    },
    stock:{
        type: Number,
        required: true
    },
    status:{
        type: Boolean,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    premium: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false
    }

})

schema.plugin(aggregatePaginate)

schema.virtual('id').get(function (){
    return this._id.toString()
})

module.exports = mongoose.model('Product', schema, 'products')