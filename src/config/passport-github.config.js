const passport = require('passport')
const { Strategy } = require('passport-github2')
const User = require('../dao/mongo/models/user.model')
// const hashingUtils = require('../utils/hashing')

// const { clientID, clientSecret, callBackURL } = require('./github.private')
const config = require('../config.js')
const { clientID, clientSecret, callBackURL } = config
const initializeStrategy = () => {
    console.log("Estrategia GH iniciada")
    passport.use('github', new Strategy({
        clientID,
        clientSecret,
        callBackURL
    }, async (_accessToken, _refreshToken, profile, done) => {
        try{
            const user = await User.findOne({email: profile._json.email})
            if(user){
                return done(null, user)
            }

            console.log(profile._json)

            const fullName = profile._json.name

            let firstName
            let lastName


            if(fullName){
                firstName = fullName.subString(0, fullName.lastIndexOf(' '))
                lastName = fullName.subString(fullName.lastIndexOf(' ') + 1)
            }else {
                firstName = profile._json.login
                lastName = ""
            }

            const newUser = {
                firstName,
                lastName,
                age: 30,
                email: profile._json.email,
                password: ' ',
                role: 'user'
            }

            const result = await User.create(newUser)
            done(null, result)
        }catch(err){
            done(err)
    }
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        const user = await User.findById(id)
        done(null, user)
    })
}

module.exports = initializeStrategy