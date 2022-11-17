const express = require("express");
const upload = require("../middlewares/uploadFiles");
const { productValidation } = require("../validations/productValidation");
const catchValidationError = require("../middlewares/catchValidationError");
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");

const router = express.Router();

const {
  uploadProductImage,
  createProduct,
  getProducts,
  uploadProductDocument,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

router.post(
  "/uploadImage",
  auth,
  isAdmin,
  upload.single("image"),
  uploadProductImage
);
router.post(
  "/",
  auth,
  isAdmin,
  productValidation,
  catchValidationError,
  createProduct
);
router.get("/", getProducts);
router.post("/uploadDocs", upload.array("Documents"), uploadProductDocument);
router.delete("/:id", auth, isAdmin, deleteProduct);
router.get("/:id", getSingleProduct);
router.put("/:id", auth, isAdmin, updateProduct);

module.exports = router;
