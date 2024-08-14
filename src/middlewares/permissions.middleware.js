const userDAO = require('../dao/factory').user

module.exports = {
    userIsAdmin: async (req, res, next) => {
        const userEmail = req.session.user.email 
        const user = await userDAO.getUser(userEmail)

        const role = user.role

        if(role == 'admin'){
            next()
        }else{
            return res.status(400).json({error: "You should be an admin!"})
        }
    },
    userIsNotAdmin: async (req, res, next) => {
        const userEmail = req.session.user.email 
        const user = await userDAO.getUser(userEmail)

        const role = user.role

        if(role == 'user'){
            next()
        }else{
            return res.status(400).json({error: "You should not be an admin!"})
        }
    },
    userIsPremium: async (req, res, next) => {
        const userEmail = req.session.user.email
        const user = await userDAO.getUser(userEmail)

        const role = user.role

        if(role == 'premium'){
            next()
        }else{
            return res.status(400).json({error: 'You should be premium!'})
        }
    }
}