const { Router } = require('express')
// const cart = require('../dao/dbManagers/carts.js')
const router = Router()

const { userIsLoggedIn } = require('../middlewares/auth.middleware.js')

const { CartsController } = require('../controllers/carts.controller.js')
const { CartsService } = require('../services/carts.service.js')

const withController = callback => {
    return (req, res) => {
        //Instanciamos una clase de servicio
        const service = new CartsService(
            req.app.get('carts.storage')
        )
        //Instanciamos el controlador enviandole la clase de servicio
        const controller = new CartsController(service)
        return callback(controller, req, res)
    }
}

router.get('/:cid', withController((controller, req, res) => controller.getCartById(req, res)))

router.delete('/:cid', withController((controller, req, res) => controller.deleteProductsFromCart(req, res)))

router.put('/:cid', withController((controller, req, res) => controller.updateProductsFromCart(req, res)))

router.post('/', withController((controller, req, res) => controller.createCart(req, res)))

router.post('/:cid/product/:pid', withController((controller, req, res) => controller.addProductToCart(req, res)))

router.delete('/:cid/product/:pid', withController((controller, req, res) => controller.deleteProductFromCart(req, res)))

router.put('/:cid/product/:pid', withController((controller, req, res) => controller.updateProductQuantity(req, res)))

router.post('/:cid/purchase', userIsLoggedIn, withController((controller, req, res) => controller.purchase(req, res)))



module.exports = {
    configure: app => app.use('/api/carts', router)
}

