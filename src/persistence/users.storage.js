const userDAO = require('../dao/factory').user
const documentDAO = require('../dao/factory').document
class UsersStorage{
    async getUserById(uid){
        return await userDAO.getUserById(uid)
    }

    async uploadDocuments(uid, id, dom, account){
        //Sigue el mismo proceso para cada documento dependiendo de si se subio o no
        if(id){
            //Se sube el documento y se guarda el id
            const document = await documentDAO.uploadDocument(id)
            const documentId = document._id.toString()

            //Se actualiza el status y se guarda la ruta al documento
            await userDAO.updateUserIdStatus(uid)
            await userDAO.addDocument(uid, {documentId})
        }
        if(dom){
            const document = await documentDAO.uploadDocument(dom)
            const documentId = document._id.toString()
            await userDAO.updateUserDomStatus(uid)
            await userDAO.addDocument(uid, {documentId})
        }
        if(account){
            const document = await documentDAO.uploadDocument(account)
            const documentId = document._id.toString()
            await userDAO.updateUserAccountStatus(uid)
            await userDAO.addDocument(uid, {documentId})
        }
    }

    async premium(uid){
        return await userDAO.premium(uid)
    }

    async getUsers(){
        return await userDAO.getUsers()
    }

    async deleteUserByEmail(email){
        return await userDAO.deleteUserByEmail(email)
    }
}

module.exports = { UsersStorage }