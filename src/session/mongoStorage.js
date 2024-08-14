const MongoStore = require('connect-mongo')
const session = require('express-session')
const defaultOptions = require('./defaultOptions')

const config = require('../config')

const storage = MongoStore.create({
    dbName: config.DBNAME,
    mongoUrl: config.MONGO_URI,
    ttl: 120
})

module.exports = session({
    store: storage,
    ...defaultOptions
})