const {ProductsDTO} = require('../dao/DTOs/products.dto')
const { mockingProducts } = require('../createProducts')
const { CustomError } = require('../errors/CustomError')
const { generateInvalidProductDataError } = require('../errors/errors')
const { ErrorCodes } = require('../errors/errorCodes')


class ProductsService {
    constructor(storage) {
        this.storage = storage
    }

    async getProducts(limit = null, page = 1, sort= null, queryField = null, queryContent = null){
        let results = await this.storage.getProducts(limit, page, sort, queryField, queryContent)

        const data = new ProductsDTO(limit, queryField, queryContent, sort, results).data
        
        return data;
    }

    async getProductById(pid){

      //Si el ID no tiene 24 caracteres como los de mongo arroja error
      if(pid.length != 24){
        throw CustomError.createError({
          name: 'Invalid Data',
          cause: 'The ID must have 24 characters',
          message: "That ID is not valid",
          code: ErrorCodes.INVALID_DATA_ERROR
        })
      }
      const product = await this.storage.getProductById(pid)
      //Si la query no retorno nada (no se encontro el producto) arroja error
      if(product){
          return(product)
      }else{
          throw CustomError.createError({
            name: 'Not found',
            cause: 'Invalid product ID',
            message: 'No product with that ID was found',
            code: ErrorCodes.NOT_FOUND
          })
      }
    }

    async addProduct(title, description, price, thumbnail, code, stock, category, premium){
        //Validar que esten todos los datos y el stock y precio sean correctos
        const validStock = !isNaN(stock) || stock >= 0
        const validPrice = !isNaN(price) || price >= 0

        if(title && description && code && stock && category && validStock && validPrice){
          if(premium){
            return await this.storage.addProduct(title, description, price, thumbnail, code, stock, category, premium)
          }else{
            return await this.storage.addProduct(title, description, price, thumbnail, code, stock, category, null)
          }
        }else{
          //en caso de que los datos no sean correctos se arroja error
            throw CustomError.createError({
              name: 'Invalid Data',
              cause: generateInvalidProductDataError(title, description, price, code, stock, category, thumbnail),
              message: "Invalid Data was sent",
              code: ErrorCodes.INVALID_DATA_ERROR
            }) 
        }
    }

    async deleteProduct(id){
        //Controlar que el id sea valida antes de enviar la orden a la DB
        let validId = id.length == 24
        if(validId){
            return await this.storage.deleteProduct(id)
        }else{
            throw CustomError.createError({
              name: 'Invalid Data',
              cause: 'The id should be a 24 letter long String',
              message: "The ID that was sent is not valid",
              code: ErrorCodes.INVALID_DATA_ERROR
            })
        }
    }

    async updateProduct(id, newValues){
        let invalidId = id.length != 24

    //Keys posibles a editar
      let validKeys = ["title", "description", "price", "thumbnail", "code", "stock"]
      //Keys a editar
      let newKeys = Object.keys(newValues) 

      //El id no puede ser modificado, por lo cual se controla que no se lo haga
      if(newKeys.includes("id") || invalidId){
        throw CustomError.createError({
          name: 'Invalid Data',
          cause: 'The id can not be modified',
          message: 'A new ID was sent which can not be modified',
          code: ErrorCodes.INVALID_DATA_ERROR
        })
      }

      //Controlar que se modifiquen campos validos
      newKeys.forEach((key) => {
        if(!validKeys.includes(key)){
          throw CustomError.createError({
            name: 'Invalid Data',
            cause: `The only keys that can be modified are ${validKeys}`,
            message: "You must send valid keys",
            code: ErrorCodes.INVALID_DATA_ERROR
          })
        }
      })

      return await this.storage.updateProduct(id, newValues)
    }

    async getUser(userEmail){
      if(userEmail){
        return await this.storage.getUser(userEmail)
      }else{
        //Se arroja error si no se recibio un email
        throw CustomError.createError({
          name: 'Invalid Data',
          cause: 'No user email was received',
          message: 'You must send an email',
          code: ErrorCodes.INVALID_DATA_ERROR
        })
      }
    }

    async getUserById(uid){
      return await this.storage.getUserById(uid)
    }

    async mockingProducts(){
      return await mockingProducts()
    }
}

module.exports = {ProductsService}