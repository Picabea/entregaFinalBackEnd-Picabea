const dotenv = require('dotenv')

dotenv.config()

module.exports = {
    MONGO_URI: process.env.MONGO_URI,
    SECRET: process.env.SECRET,
    appId: process.env.APPID,
    clientID: process.env.CLIENTID,
    clientSecret: process.env.CLIENTSECRET,
    callBackURL: process.env.CALLBACKURL
}