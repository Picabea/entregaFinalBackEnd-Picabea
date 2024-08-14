const CartModel = require('./models/cart.model')

class CartDAO {
    constructor(){}
    async getCartById(cid){
        const carts = await CartModel.find()
        const cart = carts.map(cart => cart.toObject({virtuals: true})).find(cart => cart.id === cid)
        return cart
    }

    async createCart(products){
        return await CartModel.create({products})
    }

    async addProductToCart(cid, pid, quantity){
        const cart = await this.getCartById(cid)
        const newProducts = cart.products
        //Se recupera el carrito y se le agrega el producto nuevo
        newProducts.push({
            productId: pid,
            quantity
        })

        return await CartModel.updateOne({_id: cid}, {$set: {products: newProducts}})
    }

    async deleteProductFromCart(cid, pid){
        const cart = await CartModel.findByIdAndUpdate(cid, {
          $pull: { products: { productId: pid } },
        });

        return(cart)
    }

    async deleteProductsFromCart(cid){
        const cart = await CartModel.findByIdAndUpdate(cid, {
            $set: {products: []}
        })
        return(cart)
    }

    async updateProductsFromCart(cid, products){
        const cart = await CartModel.findByIdAndUpdate(cid, {
            $set: {products: products},
          });

          return(cart)
    }

    async updateProductQuantity(cid, pid, newQuantity){
        //Se elimina el producto
        const cart = await CartModel.findByIdAndUpdate(cid, {
            $pull: { products: { productId: pid } },
          });
        
          //Se lo vuelve a agregar con la cantidad nueva
        const product = await CartModel.findByIdAndUpdate(cid, {
            $push: {products: {productId: pid, quantity: newQuantity}}
        })
       
        return(product)
    }
}

module.exports = CartDAO