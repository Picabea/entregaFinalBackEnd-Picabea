const { CustomError } = require("../errors/CustomError")
const { ErrorCodes } = require('../errors/errorCodes')

class CartsService {
    constructor(storage) {
        this.storage = storage
    }

    async getCartById(cid){
        //Se arroja error si no llego ningun ID
        if(cid){
            return await this.storage.getCartById(cid)
        }else{
            throw CustomError.createError({
                name: 'Invalid Data',
                cause: 'No cart ID was received',
                message: 'You must send a cart ID',
                code: ErrorCodes.INVALID_DATA_ERROR
            })
        }
    }

    async createCart(products){
        return await this.storage.createCart(products)
    }

    async addProductToCart(cid, pid, quantity){
        return await this.storage.addProductToCart(cid, pid, quantity)
    }

    async deleteProductFromCart(cid, pid){
        return await this.storage.deleteProductFromCart(cid, pid)
    }

    async deleteProductsFromCart(cid){
        return await this.storage.deleteProductsFromCart(cid)
    }

    async updateProductsFromCart(cid, products){
        return await this.storage.updateProductsFromCart(cid, products)
    }

    async updateProductQuantity(cid, pid, newQuantity){
        //Se arroja error si no se envio la cantidad nueva del producto
        if(!newQuantity){
            throw CustomError.createError({
                name: 'Invalid Data',
                cause: 'No newQuantity was received',
                message: 'You must send the new quantity the product will have',
                code: ErrorCodes.INVALID_DATA_ERROR
            })
        }
        return await this.storage.updateProductQuantity(cid, pid, newQuantity)
    }

    async getUser(email){
        return await this.storage.getUser(email)
    }

    async getProductStock(pid){
        return await this.storage.getProductStock(pid)
    }

    async buyProduct(pid, newQuantity){
        return await this.storage.buyProduct(pid, newQuantity)
    }

    async createTicket(total, userEmail){
        //El total debe ser mayor que cero
        if(total <= 0){
            throw CustomError.createError({
                name: 'Invalid Total',
                cause: 'The total of the ticket must be greater than 0',
                message: 'No products were being bought',
                code: ErrorCodes.INVALID_TOTAL_ERROR
            })
        }
        const date = Date.now()
        //Se crea un codigo "aleatorio"
        const code = date * total
        return await this.storage.createTicket(code, date, total, userEmail)
    }

    async updateProductsFromCart(cid, unboughtProducts){
        return await this.storage.updateProductsFromCart(cid, unboughtProducts)
    }
}

module.exports = { CartsService }