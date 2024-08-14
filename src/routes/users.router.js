const { Router } = require('express')

const { userIsLoggedIn, userIsNotLoggedIn } = require('../middlewares/auth.middleware.js')
const { userIsAdmin } = require('../middlewares/permissions.middleware.js')

const router = Router()

const {UsersService} = require('../services/users.service.js')
const {UsersController} = require('../controllers/users.controller.js')

const uploader = require('../utils/multer.js')
const customUploader = uploader.fields([{ name: 'id', maxCount: 1 }, { name: 'dom', maxCount: 1 }, {name: 'account', maxCount: 1}])

const withController = callback => {
    return (req, res) => {
        //Instanciamos una clase de servicio
        const service = new UsersService(
            req.app.get('users.storage')
        )
        //Instanciamos el controlador enviandole la clase de servicio
        const controller = new UsersController(service)
        return callback(controller, req, res)
    }
}

router.get('/premium/:uid', userIsLoggedIn, withController((controller, req, res) => controller.premium(req, res)))

router.post('/:uid/documents', userIsLoggedIn, customUploader, withController((controller, req, res) => controller.uploadDocuments(req, res)))

router.get('/uploadFiles', userIsLoggedIn, withController((controller, req, res) => controller.uploadFiles(req, res)))

router.get('/getusers', userIsLoggedIn, userIsAdmin, withController((controller, req, res) => controller.getUsers(req, res)))

router.delete('/', userIsLoggedIn, userIsAdmin, withController((controller, req, res) => controller.deleteInactiveUsers(req, res)))

router.get('/manageuser/:uid', userIsLoggedIn, userIsAdmin, withController((controller, req, res) => controller.manageUser(req, res)))

module.exports = {
    configure: app => app.use('/api/users', router)
}