const express = require("express");
const upload = require('../middlewares/uploadFiles');
const {productValidation} = require('../validations/productValidation');
const catchValidationError = require('../middlewares/catchValidationError');

const router = express.Router();

const { 
    uploadProductImage,
    createProduct, 
    getProducts, 
    uploadProductDocument,
    getSingleProduct, 
    updateProduct, 
    deleteProduct 
} = require("../controllers/productController");

router.post("/uploadImage",upload.single('image'),uploadProductImage);
router.post("/",productValidation,catchValidationError,createProduct);
router.get("/",getProducts);
router.post("/uploadDocs",upload.array('Documents'),uploadProductDocument);
router.delete("/:id",deleteProduct);
router.get("/:id",getSingleProduct);
router.put("/:id",updateProduct);

// router.route("/").get(getAllProducts);
// // router.post("/new",productValidation,catchValidationError,createNewProduct);
// router.route("/new").post(createNewProduct);
// router.route("/:id").get(getASingleProduct)
//                     .delete(deleteProduct)
//                     .put(updateProduct)


module.exports = router;