const { connectToDB, closeConnection } = require('./connection')
const { faker } = require('@faker-js/faker')
const Product = require('./dao/mongo/models/product.model')

const pickRandom = arr => arr[parseInt(Math.random() * arr.length)]

const randomCategory = () => pickRandom(["gaseosas", "electrodomestico", "comestible"])

const mockingProducts = async () => {

    const NUM = 100

        for (let i = 0; i < NUM; i++) {
            const title = faker.commerce.product()
            const price = faker.commerce.price({ max: 3000 })
    
            const product = {
                title,
                description: faker.commerce.productDescription(),
                price,
                code: title[0] + title[1] + title[2] + price,
                stock: faker.number.int({min: 0, max: 100}),
                category: randomCategory(),
                thumbnail: `imagen.com/${title}`,
                status: true
            }
            
            let result = await Product.create(product)
            console.log(result)
    }
    console.log('Database has been seeded!')

    return('success')
}

module.exports = { mockingProducts }