const CartDAO = require('../dao/factory').cart
const UserDAO = require('../dao/factory').user
const ProductDAO = require('../dao/factory').product
const TicketDAO = require('../dao/factory').ticket

class CartsStorage{
    async getCartById(cid){
        return await CartDAO.getCartById(cid)
    }

    async createCart(products){
        return await CartDAO.createCart(products)
    }

    async addProductToCart(cid, pid, quantity){
        return await CartDAO.addProductToCart(cid, pid, quantity)
    }

    async deleteProductFromCart(cid, pid){
        return await CartDAO.deleteProductFromCart(cid, pid)
    }

    async deleteProductsFromCart(cid){
        return await CartDAO.deleteProductsFromCart(cid)
    }

    async updateProductsFromCart(cid, products){
        return await CartDAO.updateProductsFromCart(cid, products)
    }

    async updateProductQuantity(cid, pid, newQuantity){
        return await CartDAO.updateProductQuantity(cid, pid, newQuantity)
    }

    async getUser(email){
        return await UserDAO.getUser(email)
    }

    async getProductStock(pid){
        return await ProductDAO.getProductById(pid)
    }
    
    async buyProduct(pid, newQuantity){
        return await ProductDAO.buyProduct(pid, newQuantity)
      }
    
    async createTicket(code, date, total, userEmail){
        return await TicketDAO.createTicket(code, date, total, userEmail)
    }

    async updateProductsFromCart(cid, unboughtProducts){
        return await CartDAO.updateProductsFromCart(cid, unboughtProducts)
    }
}

module.exports = { CartsStorage }