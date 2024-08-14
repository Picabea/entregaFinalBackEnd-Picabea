const mongoCartDAO = require('./mongo/cart.dao')
const mongoProductDAO = require('./mongo/product.dao')
const mongoUserDAO = require('./mongo/user.dao')
const mongoTicketDAO = require('./mongo/ticket.dao')
const documentDAO = require('./mongo/document.dao')

const fsCartDAO = require('./fs/cart.dao')
const fsProductDAO = require('./fs/product.dao')
const fsUserDAO = require('./fs/user.dao')

const {options} = require('../utils/commander')
const persistence = options.fileSystem == 'true'
?'fs'
:'mongo'

if(persistence == 'fs'){
    module.exports = {
        cart: fsCartDAO,
        product: fsProductDAO,
        user: fsUserDAO,
    }
}else{
    let cart = new mongoCartDAO
    let product = new mongoProductDAO
    let user = new mongoUserDAO
    let ticket = new mongoTicketDAO
    let document = new documentDAO

    module.exports = {
        cart,
        product,
        user,
        ticket,
        document
    }
}

