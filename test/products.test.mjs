import { expect } from 'chai'
import supertest from 'supertest'

const requester = supertest('http://localhost:8080')

describe('Testing de Products', () => {
    const mockProduct = {
        title: "Sprite Zero 300ml",
        description: "Refresco burbujeante con sabor a lima-limón, sin calorías y sin azúcar.",
        price: 700,
        thumbnail: 'www.imagen.com/sprite-zero',
        code: 's330',
        stock: 10,
        category: "gaseosas"
    }
    let idProducto 
    
    
    describe('Creacion de producto y busqueda del mismo', async () => {
        
        
        it('Deberia crear el producto correctamente', async () => {
            const {statusCode, ok, body} = await requester.post('/api/products/').send(mockProduct)
            
            idProducto = body.product._id
            
            expect(statusCode).to.be.equals(200)
            expect(ok).to.be.ok
            expect(body.product).to.have.property('_id')
        })
        
        it('Deberia encontrar el producto buscandolo por ID', async () => {
            const {statusCode, ok, body} = await requester.get(`/api/products/${idProducto}`)
            
            expect(statusCode).to.be.equals(200)
            expect(ok).to.be.ok
            expect(body).to.have.property('_id')
        })
    })
    
    describe('Comprobar que la validacion de datos para crear un producto es correcta', async () => {
        it('Deberia dar error al enviar un precio en forma de string', async () => {
            const {statusCode} = await requester.post(`/api/products/`).send({...mockProduct, price: "a", code: 'prueba'})
            expect(statusCode).to.be.equals(400)
        })

        it('Deberia dar error al no enviar todos los datos', async () => {
            const {statusCode} = await requester.post(`/api/products/`).send({title: "Prueba"})

            expect(statusCode).to.be.equals(400)
        })

        it('Deberia dar error al dar un stock negativo', async () => {
            const {statusCode} = await requester.post(`/api/products/`).send({...mockProduct, stock: 0, code: 'prueba'})

            expect(statusCode).to.be.equals(400)
        })

        it('Deberia dar error ya que el codigo esta repetido', async () => {
            const {statusCode} = await requester.post(`/api/products/`).send(mockProduct)

            expect(statusCode).to.be.equals(500)
        })
    })

    describe('Comprobar que la eliminacion y actualizacion de productos funcionan correctamente', () => {
        it('Deberia actualizar el producto correctamente', async () => {
            const {statusCode, body} = await requester.put(`/api/products/${idProducto}`).send({title: "Prueba"})

            expect(statusCode).to.be.equals(200)
            expect(body.acknowledged).to.be.true
            expect(body.modifiedCount).to.be.equals(1)
        })

        it('Deberia eliminar el producto correctamente', async () => {
            const {statusCode, body} = await requester.delete(`/api/products/${idProducto}`)

            expect(statusCode).to.be.equals(200)
            expect(body.deletedCount).to.be.equals(1)
            })
        })
})