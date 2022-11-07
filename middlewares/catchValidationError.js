const { validationResult } = require('express-validator');

module.exports = (req, res, next) =>{
    const err = validationResult(req);
    (err.isEmpty())? (next()):(res.status(400).json({success:false,message:err.errors[0].msg}));
}