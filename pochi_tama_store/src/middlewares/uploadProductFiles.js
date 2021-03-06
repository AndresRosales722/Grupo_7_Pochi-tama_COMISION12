const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../public/img/products')) // Indica donde tiene que guardar el archivo que se suba
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`) // Construye el nuevo nombre del archivo removiendo el original
    }
})

const fileFilter = function(req, file,callback) {
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
        req.fileValidationError = "Sólo imágenes (.jpg, .jpeg, .png, .gif)";
        return callback(null,false,req.fileValidationError);
    }
    callback(null,true);
}

const uploadFile = multer({storage, fileFilter})

module.exports = uploadFile