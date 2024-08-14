const UserModel = require('./models/user.model')
const { hashPassword } = require('../../utils/hashing')

class UserDAO {
    constructor(){}
    async getUser(userEmail){
        return await UserModel.findOne({email: userEmail}).lean()
    }

    async restorePassword(email, newPassword){
        return await UserModel.findOneAndUpdate({email}, {password: hashPassword(newPassword)})
    }

    async getUserById(id){
        return await UserModel.findById(id)
    }

    async restorePassword(email, newPassword){
        return await UserModel.findOneAndUpdate({email}, {password: hashPassword(newPassword)})
    }

    async userLastConnection(email){
        const nowDate = Date.now()
        return await UserModel.findOneAndUpdate({email}, {last_connection: nowDate})
    }

    async updateUserIdStatus(uid){
        return await UserModel.findByIdAndUpdate(uid, {id_loaded: true})
    }

    async updateUserDomStatus(uid){
        return await UserModel.findByIdAndUpdate(uid, {dom_loaded: true})
    }

    async updateUserAccountStatus(uid){
        return await UserModel.findByIdAndUpdate(uid, {account_loaded: true})
    }

    async addDocument(uid, document){
        return await UserModel.findByIdAndUpdate(uid, {$push: {documents: document}})
    }

    async premium(uid){
        return await UserModel.findByIdAndUpdate(uid, {role: 'premium'})
    }

    async getUsers(){
        return await UserModel.find({})
    }

    async deleteUserByEmail(email){
        return await UserModel.findOneAndDelete({email})
    }

    async deleteUserById(uid){
        return await UserModel.findByIdAndDelete(uid)
    }

    async changeRole(uid, role){
        return await UserModel.findByIdAndUpdate(uid, {role})
    }
}

module.exports = UserDAO