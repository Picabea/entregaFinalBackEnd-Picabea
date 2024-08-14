class ViewsService {
    constructor(storage) {
        this.storage = storage
    }

    async getUser(id){
        return await this.storage.getUser(id)
    }

    async getUserByEmail(email){
        return await this.storage.getUserByEmail(email)
    }

}

module.exports = { ViewsService }