module.exports = {
    userIsLoggedIn: (req, res, next) => {
        const isLoggedIn = ![null, undefined].includes(req.session.user)
        if(!isLoggedIn){
            return res.status(400).json({error: "User should be logged in!"})
        }
        next()
    },
    userIsNotLoggedIn: (req, res, next) => {
        const isLoggedIn = ![null, undefined].includes(req.session.user)
        if(isLoggedIn){
            return res.status(400).json({error: "User should not be logged in!"})
        }
        next()
    }
}