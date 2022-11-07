const express = require('express');
const router = express.Router();
const {categoryValidation} = require("../validations/categoryValidation"); 
const catchValidationError = require("../middlewares/catchValidationError");
const upload = require('../middlewares/uploadFiles');

const { 
    createCategory,
    uploadCategoryImage,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory
} = require("../controllers/categoryController");

router.get("/", getCategories);
router.get("/:id",getCategory);
router.post("/uploadImage",upload.single('image'),uploadCategoryImage);
router.post("/", categoryValidation,catchValidationError,createCategory);
router.delete("/:id",deleteCategory);
router.put("/:id",updateCategory)

module.exports = router;