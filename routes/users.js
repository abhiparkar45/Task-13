const express = require("express");
const router = express.Router();
const {
  createUser,
  authenticateUser,
  forgotPassword,
  getUsers,
  verifyOTP,
} = require("../controllers/userController");
const { userValidation } = require("../validations/userValidation");
const catchValidationError = require("../middlewares/catchValidationError");
const { createAdmin, makeAdmin } = require("../controllers/adminController");
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");

router.get("/", getUsers);
router.post("/register", userValidation, catchValidationError, createUser);
router.post("/login", authenticateUser);
router.post("/createAdmin", userValidation, catchValidationError, createAdmin);
router.post("/forgotpassword", forgotPassword);
router.put("/makeAdmin/:id", auth, isAdmin, makeAdmin);
router.post("/verifyotp", verifyOTP);

module.exports = router;
