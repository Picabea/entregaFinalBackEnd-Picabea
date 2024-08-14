const winston = require('winston')

const {options} = require('./commander')
const mode = options.development == 'true'
?'development'
:'production'

const customLevels = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5 
    }
}

let logger

if(mode == 'development'){
    logger = winston.createLogger({
        levels: customLevels.levels,
        transports: [
            new winston.transports.Console({level: 'debug'})
        ]
    })
}else{
    logger = winston.createLogger({
        levels: customLevels.levels,
        transports: [
            new winston.transports.File({
                filename: 'errors.log',
                level: 'info'
            })
        ]
    })
}

module.exports = {
    addLogger: (req, res, next) => {
        req.logger = logger
        next()
    }
}