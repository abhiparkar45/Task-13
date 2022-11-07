const { body } = require('express-validator');

exports.userValidation = [
    body('firstName')
        .notEmpty().withMessage('First name is required !')
        .isLength({ min: 3, max: 15 }).withMessage('first name should be of atleast 3 and atmost 15 character long !')
        .custom((val) => {
            const trimmedVal = val.trim();
            const regex = /^[a-zA-Z]{3,15}$/g;
            const res = regex.test(trimmedVal);
            return (res) ? (true) : (false);
        }).withMessage('Invalid first name !'),
    body('lastName')
        .notEmpty().withMessage('Last name is required !')
        .isLength({ min: 3, max: 15 }).withMessage('last name should be of atleast 3 and atmost 15 character long !')
        .custom((val) => {
            const trimmedVal = val.trim();
            const regex = /^[a-zA-Z]{3,15}$/g;
            const res = regex.test(trimmedVal);
            return (res) ? (true) : (false);
        }).withMessage('Invalid first name !'),
    body('userName')
        .notEmpty().withMessage('username is required !')
        .isLength({ min: 5, max: 20 }).withMessage('username should be of atleast 5 and atmost 20 character long !'),
    body('age')
        .notEmpty().withMessage('Age is required!')
        .custom((val) => !isNaN(val)).withMessage('Invalid Age !'),
    body('email')
        .isEmail().withMessage('Invalid Email !'),
    body('phone')
    .notEmpty().withMessage('Please Provide Phone Number !')
    .isLength({min:10,max:10}).withMessage('Invalid Phone Number !')
    .custom((val)=> !isNaN(val)).withMessage('Invalid Phone Number !'),
    body('password')
    .notEmpty().withMessage('Password is Required !')
    .isLength({min:6,max:12}).withMessage('Password should be at least 6 characters and at most 12 character long !')
    .isStrongPassword().withMessage('Password should be combination of at least a lower case, Upper case, Number and a Symbol !')
]