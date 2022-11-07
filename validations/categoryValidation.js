const {body} = require('express-validator');

exports.categoryValidation = [
    body('categoryName')
        .notEmpty().withMessage('category name is required !')
        .isLength({min:5,max:15}).withMessage('category name should be at least 5 characters long and at most 15 character long !')
        .custom((val)=>{
            const trimmedVal = val.trim();
            const regex = /^[a-zA-Z]{5,20}$/g;
            const res = regex.test(trimmedVal);
            return (res)?(true):(false);
        }).withMessage('Invalid Category Name !')
    ,
    body('imageID')
        .notEmpty().withMessage('category Image ID is not provided !')
        .custom((val)=>!isNaN(val)).withMessage('Invalid imageID !')
];