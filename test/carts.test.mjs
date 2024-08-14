import { expect } from 'chai'
import supertest from 'supertest'

const requester = supertest('http://localhost:8080')

describe('Testing de Carts', () => {
    let idCarrito
    describe('Comprobar que la creacion y busqueda de carritos funciona', () => {
        it('Deberia crear un carrito correctamente', async () => {
            const {statusCode, body} = await requester.post('/api/carts/').send([])

            expect(statusCode).to.be.equals(200)
            expect(body).to.have.property('_id')

            idCarrito = body._id
        })

        it('Deberia encontrar el carrito por su id', async () => {
            const {statusCode, body} = await requester.get(`/api/carts/${idCarrito}`)

            expect(statusCode).to.be.equals(200)
            expect(body).to.have.property('_id')
            
        })
    })

    describe('Comprobar todos los metodos para modificar el carrito', () => {
        it('Deberia añadir un producto al carrito', async () => {
            const {statusCode, body} = await requester.post(`/api/carts/${idCarrito}/product/669071e956cfe280e6e59f05`).send({quantity: 2})

            expect(statusCode).to.be.equals(200)
            expect(body.modifiedCount).to.be.equals(1)

            const { body: cart } = await requester.get(`/api/carts/${idCarrito}`)
            
            expect(cart.products[0]).to.have.property('id')
        })

        it('Deberia cambiar la lista de productos por la que se envia', async () => {
            const {statusCode} = await requester.put(`/api/carts/${idCarrito}`).send([{productId: "669071e956cfe280e6e59f05", quantity: 1}, {productId: "669073f956cfe280e6e59f89", quantity: 1}])

            expect(statusCode).to.be.equals(200)
            
            const { body: cart } = await requester.get(`/api/carts/${idCarrito}`)
            expect(cart.products.length).to.be.equals(2)
        })

        it('Deberia actualizar la cantidad de un prodcto correctamente', async () => {
            const {statusCode} = await requester.put(`/api/carts/${idCarrito}/product/669071e956cfe280e6e59f05`).send({newQuantity: 5})

            expect(statusCode).to.be.equals(200)

            const { body: cart } = await requester.get(`/api/carts/${idCarrito}`)
            
            expect(cart.products[1].quantity).to.be.equals(5)
        })

        it('Deberia eliminar un producto del carrito', async () => {
            const {statusCode} = await requester.delete(`/api/carts/${idCarrito}/product/669071e956cfe280e6e59f05`)

            expect(statusCode).to.be.equals(200)

            const { body: cart } = await requester.get(`/api/carts/${idCarrito}`)

            expect(cart.products.length).to.be.equals(1)
        })

        it('Deberia vaciar la lista de productos', async () => {
            const { statusCode } = await requester.delete(`/api/carts/${idCarrito}`)

            expect(statusCode).to.be.equals(200)

            const { body: cart } = await requester.get(`/api/carts/${idCarrito}`)
            console.log(cart)
            expect(cart.products.length).to.be.equals(0)
        })
    })

    describe('Comprobaciones de seguridad', () => {
        it('Debe arrojar error al crear un carrito sin enviar un body', async () => {
            const {statusCode} = await requester.post('/api/carts/')

            expect(statusCode).to.be.equals(500)
        })
    })
})


//Añadir este producto para hacer el testing
// {
//     "title": "Prueba para el carrito",
//     "description": "Lorem",
//     "price": 700,
//     "thumbnail": "www.imagen.com/prueba",
//     "code": "a",
//     "stock": 10,
//     "category": "gaseosas"
// }
// {
//     "title": "Prueba para el carrito 2",
//     "description": "Lorem",
//     "price": 700,
//     "thumbnail": "www.imagen.com/prueba",
//     "code": "prueba2",
//     "stock": 10,
//     "category": "gaseosas"
// }