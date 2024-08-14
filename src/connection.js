const mongoose = require('mongoose')
const config = require('./config.js')

module.exports = {
    async connectToDB(dbName) {
        await mongoose.connect(config.MONGO_URI, {
            dbName: config.DBNAME
        })
    },

    async closeConnection() {
        await mongoose.disconnect()
    }
}