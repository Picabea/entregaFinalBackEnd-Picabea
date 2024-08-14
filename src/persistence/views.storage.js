const userDao = require('../dao/factory').user

class ViewsStorage{
    async getUser(id){
        return await userDao.getUserById(id)
    }

    async getUserByEmail(email){
        return await userDao.getUser(email)
    }
}

module.exports = { ViewsStorage }