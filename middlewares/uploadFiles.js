const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null,'uploadedImages');
    },
    filename:(req, file, cb)=>{
        cb(null, Date.now() + path.extname(file.originalname))
    }})

const filterFile = (req, file, cb) =>{
    (file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg' || file.mimetype == 'image/png')? cb(null, true):cb(null,false);
}

const upload = multer({storage,filterFile})

module.exports = upload;