const { Router } = require('express')

const { hashPassword, isValidPassword } = require('../utils/hashing.js')
const { userIsLoggedIn } = require('../middlewares/auth.middleware.js')

const passport = require('passport')

const router = Router()

const { SessionService } = require('../services/session.service.js')
const { SessionController } = require('../controllers/session.controller.js')


const withController = callback => {
    return (req, res) => {
        //Instanciamos una clase de servicio
        const service = new SessionService(
            req.app.get('session.storage')
        )
        //Instanciamos el controlador enviandole la clase de servicio
        const controller = new SessionController(service)
        return callback(controller, req, res)
    }
}

router.post('/login', passport.authenticate('login', { failureRedirect: '/api/sessions/failLogin'}), withController((controller, req, res) => controller.login(req, res)))

router.post('/register', passport.authenticate('register', {failureRedirect: '/api/sessions/failRegister'}), withController((controller, req, res) => controller.register(req, res)))

router.get('/failRegister', withController((controller, req, res) => controller.failRegister(req, res)))

router.get('/failLogin', withController((controller, req, res) => controller.failLogin(req, res)))

router.get('/logout', withController((controller, req, res) => controller.logout(req, res)))

router.get('/current', userIsLoggedIn, withController((controller, req, res) => controller.current(req, res)))

router.post('/restorePassword', withController((controller, req, res) => controller.restorePassword(req, res)))

router.get('/github', passport.authenticate('github', {scope: ['user:email']}), (req, res) => {})

router.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/'}), withController((controller, req, res) => controller.githubcallback(req, res)))

router.get('/userbyemail', withController((controller, req, res) => controller.userByEmail(req, res)))

module.exports = {
    configure: app => app.use('/api/sessions', router)
}