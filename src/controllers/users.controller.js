const usersDTO = require("../dao/DTOs/users.dto")
const { CustomError } = require("../errors/CustomError")

class UsersController{
    constructor(productsService) {
        this.service = productsService
    }

    async premium(req, res){
        let uid = req.params.uid

        const user = await this.service.getUserById(uid)
        const results = await this.service.premium(user, uid)

        res.status(200).json(results)
    }

    async uploadDocuments(req, res){  
        const uid = req.params.uid

        const results = await this.service.uploadDocuments(uid, req.files)

        res.status(200).json({status: "success", payload: results})
    }

    async uploadFiles(req, res){
        const {_id} = req.session.user
        const user = await this.service.getUserById(_id)
        //Se recuperan los status de los documentos
        const { id_loaded, dom_loaded, account_loaded } = user
        const allLoaded = id_loaded && dom_loaded && account_loaded
        //Se envia la informacion al render para modificar lo que se renderiza
        res.render('uploadFiles', {
            _id,
            allLoaded,
            id_loaded,
            dom_loaded,
            account_loaded
        })
    }

    async getUsers(req, res){
        const users = await this.service.getUsers()
        const adaptedUsers = []
        for(let user of users){
            //Se usa el DTO para darle el formato correcto
            adaptedUsers.push(new usersDTO(user))
        }  
        res.render('users', {
            users: adaptedUsers
        })
    }

    async deleteInactiveUsers(req, res){
        const users = await this.service.getUsers()

        //Se utiliza otra funcion para ver que usuarios se deben eliminar
        const usersToDelete = await this.service.checkUsers(users)
        //En caso de que allan usuarios para eliminar 
        if(usersToDelete){
            //se los notifica via email
            await this.service.notifyUsers(usersToDelete)
            //se les elimina la cuenta
            await this.service.deleteUsers(usersToDelete)
        }
        res.json({success: true, payload: usersToDelete})
    }

    async manageUser(req, res){
        const uid = req.params.uid
        const user = await this.service.getUserById(uid)
        if(user){
            res.render('manageuser', {
                uid,
                role: user.role,
                scripts: ['manageuser.js'],
                useWS: true,
            })
        }else{
            throw CustomError.createError({
                name: 'User not found',
                cause: 'No hay ningun usuario con el ID enviado',
                message: 'Enviar un ID valido',
                code: ErrorCodes.NOT_FOUND
            })
        }
    }
}

module.exports = { UsersController }