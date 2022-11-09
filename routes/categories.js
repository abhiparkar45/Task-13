const express = require("express");
const router = express.Router();
const { categoryValidation } = require("../validations/categoryValidation");
const catchValidationError = require("../middlewares/catchValidationError");
const upload = require("../middlewares/uploadFiles");
const isAdmin = require("../middlewares/isAdmin");
const auth = require("../middlewares/auth");

const {
  createCategory,
  uploadCategoryImage,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

router.get("/", getCategories);
router.get("/:id", getCategory);
router.post(
  "/uploadImage",
  auth,
  isAdmin,
  upload.single("image"),
  uploadCategoryImage
);
router.post(
  "/",
  auth,
  isAdmin,
  categoryValidation,
  catchValidationError,
  createCategory
);
router.delete("/:id", auth, isAdmin, deleteCategory);
router.put("/:id", auth, isAdmin, updateCategory);

module.exports = router;
