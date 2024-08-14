const { Router } = require('express')
const { ProductsController } = require('../controllers/products.controller.js')
const { ProductsService } = require('../services/products.service.js')
const { userIsAdmin, userIsPremium } = require('../middlewares/permissions.middleware.js')
const { userIsLoggedIn } = require('../middlewares/auth.middleware.js')

const router = Router()

const withController = callback => {
    return (req, res) => {
        //Instanciamos una clase de servicio
        const service = new ProductsService(
            req.app.get('products.storage')
        )
        //Instanciamos el controlador enviandole la clase de servicio
        const controller = new ProductsController(service)
        return callback(controller, req, res)
    }
}

router.get('/', withController((controller, req, res) => controller.getProducts(req, res)))

router.post('/', userIsAdmin, withController((controller, req, res) => controller.addProduct(req, res)))

router.get('/mockingProducts', userIsAdmin, withController((controller, req, res) => controller.mockingProducts(req, res)))

router.get('/:pid', withController((controller, req, res) => controller.getProductById(req, res)))

router.delete('/:pid', userIsAdmin, withController((controller, req, res) => controller.deleteProduct(req, res)))

router.put('/:pid', userIsAdmin, withController((controller, req, res) => controller.updateProduct(req, res)))



module.exports = {
    configure: app => app.use('/api/products', router)
}