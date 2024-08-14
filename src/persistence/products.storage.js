const ProductDAO = require('../dao/factory').product
const UserDAO = require('../dao/factory').user

class ProductsStorage{

    async addProduct(title, description, price, thumbnail, code, stock, category, premium){
        return await ProductDAO.addProduct(title, description, price, thumbnail, code, stock, category, premium)
      }
    
    async getProducts(limit = null, page = 1, sort= null, queryField = null, queryContent = null){
      return await ProductDAO.getProducts(limit, page, sort, queryField, queryContent)
    }

    async getProductById(pid){
        return await ProductDAO.getProductById(pid)
    }

    async deleteProduct(id){
        return await ProductDAO.deleteProduct(id)
    }

    async updateProduct(id, newValues){
        return await ProductDAO.updateProduct(id, newValues)
    }

    async getUser(userEmail){
      return await UserDAO.getUser(userEmail)
    }

    async getUserById(uid){
      return await UserDAO.getUserById(uid)
    }
}

module.exports = { ProductsStorage }