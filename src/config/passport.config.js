const passport = require('passport')
const { Strategy } = require('passport-local')
const User = require('../dao/mongo/models/user.model')
const Cart = require('../dao/mongo/models/cart.model')
const hashingUtils = require('../utils/hashing')
// const { generateToken, verifyToken } = require('../utils/utils')

const initializeStrategy = () => {
    console.log("Estrategia iniciada")
    passport.use('register', new Strategy({
        passReqToCallback: true,
        usernameField: "email" 
    }, async (req, username, password, done) => {

        const { firstName, lastName, age, email } = req.body

        try{
            const cart = await Cart.create({products: []})
            console.log(cart._id)

            const user = await User.findOne({ email: username })
            if(user){
                return done(null, false)
            }

            const newUser = {
                firstName,
                lastName,
                age: +age,
                email,
                password: hashingUtils.hashPassword(password),
                cart: cart._id.toString(),
                role: 'user',
                documents: [],
                last_connection: 0,
                id_loaded: false,
                dom_loaded: false,
                account_loaded: false
            }

            const result = await User.create(newUser)

            return done(null, result)
        }catch(error){
            done(error)
        }
    }))

    passport.use('login', new Strategy({
        usernameField: 'email'
    }, async (username, password, done) => {
        try{
            if(!username || !password){
                return done(null, false)
            }
        
            // Verificar que el usuario exista
            const user = await User.findOne({email: username})
            if(!user){
                return done(null, false)
            }
            //verificar que la pass sea correcta
            if(!hashingUtils.isValidPassword(password, user.password)){
                return done(null, false)
            }

            // const credentials = { id: user._id.toString(), email: user.email}
            // const accessToken = generateToken(credentials)
            // console.log(accessToken)
            const nowDate = Date.now()
            const results = await User.findOneAndUpdate({email: username}, {last_connection: nowDate})
            console.log(results)
            return done(null, user)
        }catch(error){
            done(error)
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