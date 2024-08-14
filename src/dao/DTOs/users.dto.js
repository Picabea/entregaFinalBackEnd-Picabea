

class usersDTO{
    constructor(user){
        this.firstName = user.firstName,
        this.email = user.email,
        this.role = user.role
    }
}

module.exports = usersDTO