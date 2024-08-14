const multer = require('multer')

const storage = multer.diskStorage({
    destination: '../public/images',
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
})

const uploader = multer({storage})
module.exports = uploader