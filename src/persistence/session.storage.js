const userDAO = require('../dao/factory').user

class SessionStorage{
    async getUser(email){
        return await userDAO.getUser(email)
    }

    async restorePassword(email, newPassword){
        return await userDAO.restorePassword(email, newPassword)
    }

    async userByEmail(email){
        return await userDAO.getUser(email)
    }

    async userLastConnection(email){
        return await userDAO.userLastConnection(email)
    }
}

module.exports = { SessionStorage }