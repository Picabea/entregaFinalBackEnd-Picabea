const { CustomError } = require('../../errors/CustomError')
const { ErrorCodes } = require('../../errors/errorCodes')
const ProductModel = require('./models/product.model')

class ProductDAO {
  constructor(){}
    async addProduct(title, description, price, thumbnail, code, stock, category, premium){
        return(await ProductModel.create({
          title,
          description,
          price,
          thumbnail,
          code,
          stock,
          status: true,
          category,
          premium
        }))
    }

    async getProducts(limit = null, page = 1, sort= null, queryField = null, queryContent = null){
        
        let query = {}

        if(queryField){
          //En caso de que se filtre por categoria
          if(queryField === "category"){
            //Se valida que se alla ingresado una categoria valida, sino se arroja error
            let validContent = ["gaseosas", "electrodomestico", "comestible"].includes(queryContent)
            if(validContent){
              //Se guarda la categoria en la query
              query = {
                category: queryContent
              }
            }else{
              throw CustomError.createError({
                name: 'Invalid Data',
                cause: 'Invalid query content was sent',
                message: 'The query content must be "gaseosas", "electrodomestico" or "comestible"',
                code: ErrorCodes.INVALID_DATA_ERROR
              })
            }
            //En cambio si se filtro por stock
          }else if(queryField === "disponible"){
            let validContent = !isNaN(queryContent) && queryContent >= 1
            //Se valida que el filtro sea un numero y superior a 0
            if(validContent){
              query = {
                //Se guarda en la query
                stock: {
                  $gt: Number(queryContent)
                }
              }
            }else{
              throw CustomError.createError({
                name: 'Invalid Data',
                cause: 'Invalid query content was sent',
                message: 'The query content must be a number greater than 0',
                code: ErrorCodes.INVALID_DATA_ERROR
              })
            }
          }else{
            //se arroja error si la categoria de filtro no es valida
            throw CustomError.createError({
              name: 'Invalid Data',
              cause: 'The query field is not valid',
              message: 'Query field must be "category" or "disponible"',
              code: ErrorCodes.INVALID_DATA_ERROR
            })
          }
        }
        
        //Se configuran las opciones para filtrar productos
        const aggregations = [
          {
            $match: query
          }
        ]
  
        const paginateOptions = {
          limit,
          page
        }
  
        let sortingOrder = null
        if(sort === "asc"){
          sortingOrder = 1
        }else if(sort === "desc"){
          sortingOrder = -1
        }

        if(sortingOrder){
          paginateOptions.sort = {price: sort}
        }
        
      
      const aggregatedResults = ProductModel.aggregate(aggregations)
      
      const results = await ProductModel.aggregatePaginate(aggregatedResults, paginateOptions,
      (err, results) => {
        if(err) {
          console.error(err);
        }else {
          return results
        }
      })
      return results
    }

    async getProductById(pid){
        return await ProductModel.findById(pid)
    }

    async deleteProduct(id){
        return await ProductModel.deleteOne({_id: id})
    }

    async updateProduct(id, newValues){
        return await ProductModel.updateOne({ _id: id}, {...newValues})
    }

    async buyProduct(pid, newQuantity){
      return await ProductModel.updateOne({_id: pid}, {stock: newQuantity})
    }
}

module.exports = ProductDAO