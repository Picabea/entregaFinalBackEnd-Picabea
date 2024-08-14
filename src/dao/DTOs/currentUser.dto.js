

class CurrentUserDTO{
    constructor(user){
        this.firstName = user.firstName,
        this.age = user.age,
        this.role = user.role,
        this.cart = user.cart
    }
}

module.exports = CurrentUserDTO