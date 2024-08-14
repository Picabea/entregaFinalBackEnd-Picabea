import { expect } from 'chai'
import supertest from 'supertest'

const requester = supertest('http://localhost:8080')

describe('Testing de Sessions', () => {
    const mockUser = {
        firstName: "Prueba",
        lastName: "Prueba",
        age: 20,
        email: "prueba@prueba.com",
        password: "prueba"
    }
    describe('El registro deberia funcionar correctamente correctamente', () => {
        it('El register deberia funcionar correctamente', async () => {
            await requester.post('/api/sessions/register').send(mockUser)

            const {statusCode, ok, body} = await requester.get('/api/sessions/userByEmail').send({email: mockUser.email})
            expect(ok).to.be.ok
            expect(body).to.have.property('_id')
            expect(statusCode).to.be.equals(200)
        })

        
    })

    describe('El login deberia funcionar correctamente', () => {
        it('El login deberia funcionar correctamente', async () => {
            const {statusCode, ok, body} = await requester.post('/api/sessions/login').send({email: mockUser.email, password: mockUser.password})
            // console.log(`Variables de login: ${statusCode} - ${ok} - ${body}`)
            console.log(body)
            expect(statusCode).to.be.equals(200)
        })
    })

    describe('El metodo para restaurar la contraseña funciona', () => {
        it('Deberia restaurar la contraseña correctamente', async () => {
            const {body: user} = await requester.get('/api/sessions/userByEmail').send({email: mockUser.email})
            const oldEncryptedPassword = user.password

            const {statusCode, body} = await requester.post('/api/sessions/restorePassword').send({email: mockUser.email, newPassword: 'Nueva'})

            expect(statusCode).to.be.equals(302)
            expect(body.password).to.not.be.equals(oldEncryptedPassword)
        })
    })
})