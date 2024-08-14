const { CustomError } = require('../errors/CustomError')
const { ErrorCodes } = require('../errors/errorCodes')

class CartsController{
    constructor(productsService) {
        this.service = productsService
    }

    async getCartById(req, res){
        const cid = req.params.cid
        const response = await this.service.getCartById(cid)
        res.send(response)
    }

    async createCart(req, res){
        const products = req.body
        //Si no hay productos se crea con un array vacio
        if(products.length >= 1){
            res.send(await this.service.createCart(products))
        }else{
            res.send(await this.service.createCart([]))
        }
    }

    async addProductToCart(req, res){
        const cid = req.params.cid
        const pid = req.params.pid
        const quantity = req.body.quantity

        const response = await this.service.addProductToCart(cid, pid, quantity)
        res.send({acknowledged: response.acknowledged, modifiedCount: response.modifiedCount})
    }

    async deleteProductFromCart(req, res){
        const cid = req.params.cid
        const pid = req.params.pid

        const result = await this.service.deleteProductFromCart(cid, pid)
        res.status(200).json(result)
    }

    async deleteProductsFromCart(req, res){
        const cid = req.params.cid

        const result = await this.service.deleteProductsFromCart(cid)
        res.status(200).json(result)
    }

    async updateProductsFromCart(req, res){
        const cid = req.params.cid
        const products = req.body

        const result = await this.service.updateProductsFromCart(cid, products)
        res.status(200).json(result)
    }

    async updateProductQuantity(req, res){
        const cid = req.params.cid
        const pid = req.params.pid

        const newQuantity = req.body["newQuantity"]

        const result = await this.service.updateProductQuantity(cid, pid, newQuantity)
        
        res.json(result)
    }

    async purchase(req, res){
        const {vencimiento, tarjeta} = req.body
        //Dividimos la fecha para tener año y mes
        const vencimientoDividido = vencimiento.split('/')

        //Obtenemos la fecha actual
        const now = Date.now()
        const month = new Date(now).getMonth() + 1
        const year = (new Date(now).getFullYear() + "").slice(2)

        //Validamos que la fecha ingresada sea correcta
        if(vencimientoDividido.length == 2){
            //Si el año de vencimiento es menor al actual arroja error
            if(vencimientoDividido[1] < year){
                throw CustomError.createError({
                    name: 'Expirated Card',
                    cause: "La tarjeta esta vencida",
                    message: "Ingrese una tarjeta vigente para continuar",
                    code: ErrorCodes.EXPIRATED_CARD
                })
            //Si es igual pasamos a validar el mes
            }else if(vencimientoDividido[1] == year){
                //en caso de que el mes de vencimiento sea menor al actual se arroja error, de caso contrario continua el proceso
                if(vencimientoDividido[0] < month){
                    throw CustomError.createError({
                        name: 'Expirated Card',
                        cause: "La tarjeta esta vencida",
                        message: "Ingrese una tarjeta vigente para continuar",
                        code: ErrorCodes.EXPIRATED_CARD
                    })
                }
            }
            //En caso de que la fecha de vencimiento no venga con ninguna //
        }else{
            throw CustomError.createError({
                name: 'Invalid Expiration Date',
                cause: "La fecha de vencimiento no es valida",
                message: "Ingrese la fecha correctamente para continuar",
                code: ErrorCodes.INVALID_EXPIRATION_DATE
            })
        }
        //Recuperamos el carrito
        const userEmail = req.session.user.email
        const user = await this.service.getUser(userEmail)
        const cart = await this.service.getCartById(user.cart._id.toString())
        
        let boughtProducts = []
        let unboughtProducts = []
        let unboughtResponse = []
        let total = 0
        console.log(cart.products)
        //Si no hay productos en el carrito se arroja error
        if(cart.products.length > 0){
            //se comprueba que hay stock, en caso de no haber de agrega a la lista de productos que no se pudieron comprar
            cart.products.forEach(async product => {
                const stock = product.productId.stock
                const quantity = product.quantity
                const hasStock = stock - quantity >= 0
    
                if(hasStock){
                    this.service.buyProduct(product.productId._id, stock - quantity)
                    boughtProducts.push({
                        pid: product.productId._id,
                        quantity
                    })
                    total = total + (product.productId.price * quantity)
                }else{
                    unboughtProducts.push({
                        productId: product.productId._id,
                        quantity
                    })
                    unboughtResponse.push(product.productId)
                }
            })
        }else{
            throw CustomError.createError({
                name: 'Invalid Cart',
                cause: "El carrito debe tener productos",
                message: "Agregue productos al carrito para finalizar la compra",
                code: ErrorCodes.INVALID_CART_ERROR
            })
        }
    
        const result = await this.service.createTicket(total, userEmail)
        //Se dejan los productos que no se pudieron comprar en el carrito
        await this.service.updateProductsFromCart(user.cart._id.toString(), unboughtProducts)
        res.render('postPurchase', {
            result, 
            unboughtResponse})
    }
}

module.exports = { CartsController }