const mongoose = require('mongoose')

module.exports = {
    async connectToDB(dbName) {
        await mongoose.connect('mongodb://127.0.0.1:27017', {
            dbName
        })
    },

    async closeConnection() {
        await mongoose.disconnect()
    }
}