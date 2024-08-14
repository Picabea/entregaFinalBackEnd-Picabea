const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    code: {
        type: String,
        unique: true,
        required: true
    },
    purchase_datetime: Date,
    amount: Number,
    purchaser: String
})

module.exports = mongoose.model('Ticket', schema, 'tickets')