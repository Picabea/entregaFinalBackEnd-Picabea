const generateInvalidUserDataError = ({ name, email, age }) => {
    return `Invalid user data:
    * name  : should be a non-empty String, received ${name} (${typeof name})
    * email : should be a non-empty String, received ${email} (${typeof email})
    * age   : should be a positive Number, received ${age} (${typeof age})`
}

const generateInvalidProductDataError = (title, description, price, code, stock, category, thumbnail) => {
    return `Invalid product data:
    * title  : should be a non-empty String, received ${title} (${typeof title})
    * description : should be a non-empty String, received ${description} (${typeof description})
    * price   : should be a positive Number, received ${price} (${typeof price})
    * code : should be a non-empty String, received ${code} (${typeof code})
    * stock : should be a positive Number, received ${stock} (${typeof stock})
    * category : should be a non-empty String, received ${category} (${typeof category})
    * thumbnail : should be a non-empty String, received ${thumbnail} (${typeof thumbnail})
     `
}
module.exports = { generateInvalidUserDataError, generateInvalidProductDataError }