const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: String,
    reference: String
})

module.exports = mongoose.model('Document', schema, 'documents')