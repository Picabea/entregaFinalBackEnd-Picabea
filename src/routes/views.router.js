const { Router } = require('express')

const { userIsLoggedIn, userIsNotLoggedIn } = require('../middlewares/auth.middleware.js')

const router = Router()

const {ViewsService} = require('../services/views.service.js')
const {ViewsController} = require('../controllers/views.controller.js')
const { userIsPremium } = require('../middlewares/permissions.middleware.js')

const withController = callback => {
    return (req, res) => {
        //Instanciamos una clase de servicio
        const service = new ViewsService(
            req.app.get('views.storage')
        )
        //Instanciamos el controlador enviandole la clase de servicio
        const controller = new ViewsController(service)
        return callback(controller, req, res)
    }
}

router.get('/', withController((controller, req, res) => controller.renderHome(req, res)))

router.get('/login', userIsNotLoggedIn, withController((controller, req, res) => controller.login(req, res)))

router.get('/register', userIsNotLoggedIn, withController((controller, req, res) => controller.register(req, res)))

router.get('/profile', userIsLoggedIn, withController((controller, req, res) => controller.profile(req, res)))

router.get('/restorePassword', userIsNotLoggedIn, withController((controller, req, res) => controller.restorePassword(req, res)))

// router.get('/testEncoding', withController((controller, req, res) => controller.testEncoding(req, res)))

router.get('/loggerTest', withController((controller, req, res) => controller.loggerTest(req, res)))

router.get('/createpremiumproduct', userIsPremium, withController((controller, req, res) => controller.createPremiumProduct(req, res)))

router.get('/pay', userIsLoggedIn, withController((controller, req, res) => controller.pay(req, res)))

module.exports = {
    configure: app => app.use('/', router)
}