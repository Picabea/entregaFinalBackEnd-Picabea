

class ProductsDTO{
    
    constructor(limit, queryField, queryContent, sort, results){
        this.limitConcat = limit
        ?`&limit=${limit}`
        :"",
        this.queryConcat = queryField && queryContent
        ?`&queryField=${queryField}&queryContent=${queryContent}`
        :"",
        this.sortConcat = sort
        ?`&sort=${sort}`
        :"",
        this.prevLink = results.prevPage 
        ?`http://localhost:8080/api/products?page=${results.prevPage}${this.limitConcat}${this.queryConcat}${this.sortConcat}`
        :null,
        this.nextLink = results.nextPage
        ?`http://localhost:8080/api/products?page=${results.nextPage}${this.limitConcat}${this.queryConcat}${this.sortConcat}`
        :null,
        this.data = {
            status: "success",
            payload: results.docs,
            totalPages: results.totalPages,
            prevPage: results.prevPage,
            nextPage: results.nextPage,
            page: results.page,
            hasPrevPage: results.hasPrevPage,
            hasNextPage: results.hasNextPage,
            prevLink: this.prevLink,
            nextLink: this.nextLink
        }
    }   
}

module.exports = { ProductsDTO }