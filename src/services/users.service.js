const { CustomError } = require("../errors/CustomError")
const { ErrorCodes } = require("../errors/errorCodes")

const transport = require('../transport')

class UsersService {
    constructor(storage) {
        this.storage = storage
    }

    async getUserById(uid){
        const user = await this.storage.getUserById(uid)
        return user
    }

    async premium(user, uid){
        //Se revisa que haya subido toda la documentacion
        if(user.id_loaded && user.dom_loaded && user.account_loaded){
            return await this.storage.premium(uid)
        }else{
            throw CustomError.createError({
                name: 'Uncomplete documentation',
                cause: 'Debes subir toda la documentacion para poder ser premium',
                message: 'Falta documentacion',
                code: ErrorCodes.UNCOMPLETE_DOCUMENTATION
            })
        }
    }

    async uploadDocuments(uid, files){
        let id = false
        let dom = false
        let account = false

        //Busca cuales son los documentos que hay para actualizar al usuario
        if(files.id){
            id = {name: files.id[0].originalname, reference: files.id[0].path}
        }
        if(files.dom){
            dom = {name: files.dom[0].originalname, reference: files.dom[0].path}
        }
        if(files.account){
            account = {name: files.account[0].originalname, reference: files.account[0].path}
        }

        await this.storage.uploadDocuments(uid, id, dom, account)
        //Busca al usuario y devuelve sus status actualizados
        const user = await this.getUserById(uid)
        return {id: user.id_loaded, dom: user.dom_loaded, account: user.account_loaded}
    }

    async getUsers(){
        const users = await this.storage.getUsers()
        return users
    }

    checkUsers(users){
        const inactiveUsers = []
        const now = Date.now()
        //Cualquier fecha inferior a esta es inactiva
        let limitDate = now - (60 * 60000 * 48)
    
        for(let user of users){
            //Si la fecha es inferior a la calculada anteriormente
            if(limitDate > Date.parse(user.last_connection)){
                //Se van guardando los emails de las cuentas inactivas
                inactiveUsers.push(user.email)
            }
        }

        return inactiveUsers
    }

    async notifyUsers(users){
        for(let user of users){
            await transport.sendMail({
                from: 'APIrest',
                to: user,
                html: "<p>Su cuenta ha sido eliminada por inactividad</p>",
                subject: 'Eliminacion de cuenta'
            })
        }
    }

    async deleteUsers(users){
        for(let user of users){
            await this.storage.deleteUserByEmail(user)
        }
    }
}

module.exports = { UsersService }