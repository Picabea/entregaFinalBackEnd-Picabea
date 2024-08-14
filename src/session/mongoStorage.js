const MongoStore = require('connect-mongo')
const session = require('express-session')
const defaultOptions = require('./defaultOptions')

const storage = MongoStore.create({
    dbName: 'ecommerce',
    mongoUrl: 'mongodb://127.0.0.1:27017',
    ttl: 120
})

module.exports = session({
    store: storage,
    ...defaultOptions
})