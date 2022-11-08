const express = require('express');
const router = express.Router();
const {createUser, authenticateUser} = require('../controllers/userController');
const {userValidation} = require('../validations/userValidation');
const catchValidationError = require('../middlewares/catchValidationError');
const {createAdmin, makeAdmin}  = require('../controllers/adminController');
const auth = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');

router.post("/register",userValidation,catchValidationError,createUser);
router.post("/login",authenticateUser);
router.post("/createAdmin",userValidation,catchValidationError,createAdmin);
router.put("/makeAdmin",auth,isAdmin,makeAdmin);

module.exports = router;