const express = require('express');
const router = express.Router();
const {createUser, authenticateUser} = require('../controllers/userController');
const {userValidation} = require('../validations/userValidation');
const catchValidationError = require('../middlewares/catchValidationError')

router.post("/register",userValidation,catchValidationError,createUser);
router.post("/login",authenticateUser);

module.exports = router;