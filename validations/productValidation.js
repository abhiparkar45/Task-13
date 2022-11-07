const { body } = require('express-validator');

exports.productValidation = [
    body('productName')
        .notEmpty().withMessage('Product Name is required !')
        .isLength({ min: 5, max: 50 }).withMessage('Product Name should be at least 5 characters or at most 50 characters long !'),
    body('productPrice')
        .notEmpty().withMessage('Product Price is Required !')
        .custom((val) => !isNaN(val)).withMessage("Invalid Price !"),
    body('productDescription')
        .notEmpty().withMessage('Product Description is required !')
        .isLength({ min: 20, max: 100 }).withMessage('Product Description should be at least 20 characters or at most 100 characters long !'),
    body('inStock')
        .notEmpty().withMessage('You forget to mention whether product is instockor not')
        .isBoolean().withMessage('Invalid value provided !'),
    body('category_Id')
        .notEmpty().withMessage('Category is not provided !')
        .custom((val) => !isNaN(val)).withMessage("Invalid value !"),
    body('imageID')
        .notEmpty().withMessage('Image is not provided !')
        .custom((val) => !isNaN(val)).withMessage("Invalid value !")
];