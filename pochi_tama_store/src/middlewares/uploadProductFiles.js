const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, callback){
        callback(null, path.join(__dirname, '../../public/images/products/'))

    },
    filename: function (req, file, callback){
        callback(null, `${date.now}_img_${path.extname(file.originalname)}`) //esto retorna una cadena de strings

    }
})

const uploadFile = multer({storage})

module.exports = uploadFile