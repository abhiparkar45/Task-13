// const { where } = require("sequelize");
const db = require("../models/index");
const Product = db.Products;
const Image = db.Images;
const Category = db.Categories;
const Documents = db.Documents;
const failerResponse = require("../responseBuilder/failerResponse");
const successResponse = require("../responseBuilder/successResponse");

exports.uploadProductImage = async (req, res, next) => {
  try {
    const imgName = await req.file.filename;
    const imgURL = `${process.env.BASE_URL}/${imgName}`;
    const data = {
      imgName: imgName,
      imgURL: imgURL,
    };
    const result = await Image.create(data);
    if (result) {
      return res
        .status(201)
        .json(successResponse("Image uploaded successfully !", result));
    }
  } catch (err) {
    next(err);
  }
};
exports.createProduct = async (req, res, next) => {
  try {
    const requestBody = await req.body;
    const productName = requestBody.productName;
    const productPrice = requestBody.productPrice;
    const productDescription = requestBody.productDescription;
    const inStock = requestBody.inStock;
    const category_Id = requestBody.category_Id;
    const imageID = requestBody.imageID;
    const doesCategoryExist = await Category.findOne({
      where: { category_Id },
    });
    if (!doesCategoryExist) {
      return res.status(400).json(failerResponse("Invalid category !"));
    }
    const isImgInDb = await Image.findOne({ where: { imageID } });

    if (!isImgInDb) {
      return res.status(400).json(failerResponse("Image is not uploaded!"));
    }

    const doesExist = await Product.findOne({ where: { productName } });
    if (doesExist) {
      return res.status(400).json(failerResponse("Product already exist !"));
    }
    const data = {
      productName,
      productPrice,
      productDescription,
      inStock,
      category_Id,
      imageID,
    };
    const result = await Product.create(data);
    if (result) {
      return res
        .status(201)
        .json(successResponse("Product added successfully !", data));
    }
  } catch (err) {
    next(err);
  }
};
exports.getProducts = async (req, res, next) => {
  try {
    const Products = await Product.findAll({
      attributes: [
        "product_Id",
        "productName",
        "productPrice",
        "productDescription",
        "inStock",
      ],
      include: [
        {
          model: Category,
          attributes: ["category_Id", "categoryName"],
          include: [
            {
              model: Image,
              attributes: ["imageID", "imgURL"],
            },
          ],
        },
      ],
    });
    if (Products) {
      return res
        .status(200)
        .json(successResponse("Products retrieved successfully !", Products));
    }
  } catch (err) {
    next(err);
  }
};
exports.uploadProductDocument = async (req, res, next) => {
  try {
    const docs = await req.files;
    const product_Id = await req.body.product_Id;
    const product = await Product.findOne({ where: { product_Id } });
    if (!product) {
      return res.status(404).json(failerResponse("Product not found !"));
    }
    const results = [];
    for (let i = 0; i < docs.length; i++) {
      const docName = docs[i].filename;
      const docType = docs[i].mimetype;
      const docURL = `http://ecommerce.com/uploads/${docs[i].path}`;
      const data = { product_Id, docName, docType, docURL };
      const response = await Documents.create(data);

      if (response) {
        results.push(response.dataValues);
      } else {
        res
          .status(400)
          .json(
            failerResponse("Something went wrong while uploading documents !")
          );
        break;
      }
    }
    if (results.length === docs.length) {
      return res
        .status(200)
        .json(successResponse("Documents uploaded successfully !", results));
    }
  } catch (err) {
    next(err);
  }
};
exports.deleteProduct = async (req, res, next) => {
  try {
    const product_Id = await req.params.id;
    const productExist = await Product.findOne({
      where: { product_Id },
      attributes: [
        "product_Id",
        "productName",
        "productPrice",
        "productDescription",
        "inStock",
        "category_Id",
        "imageID",
      ],
    });
    if (!productExist) {
      return res.status(404).json(failerResponse("Product not found !"));
    }
    const result = Product.destroy({ where: { product_Id } });
    if (result) {
      return res
        .status(200)
        .json(successResponse("Product Deleted successfully !", productExist));
    }
  } catch (err) {
    next(err);
  }
};
exports.getSingleProduct = async (req, res, next) => {
  try {
    const product_Id = await req.params.id;
    const product = await Product.findOne({
      where: { product_Id },
      attributes: {
        exclude: ["createdAt", "updatedAt", "deletedAt"],
      },
      include: [
        {
          model: Documents,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
    });
    if (!product) {
      return res.status(404).json(failerResponse("Product not found !"));
    } else {
      res
        .status(200)
        .json(successResponse("Product Retrieved successfully !", product));
    }
  } catch (err) {
    next(err);
  }
};
exports.updateProduct = async (req, res, next) => {
  try {
    const product_Id = await req.params.id;
    const requestBody = await req.body;
    const productName = requestBody.productName;
    const productPrice = requestBody.productPrice;
    const productDescription = requestBody.productDescription;
    const inStock = requestBody.inStock;
    const category_Id = requestBody.category_Id;
    const imageID = requestBody.imageID;
    const doesCategoryExist = await Category.findOne({
      where: { category_Id },
    });
    if (!doesCategoryExist) {
      return res.status(400).json(failerResponse("Invalid category !"));
    }
    const isImgInDb = await Image.findOne({ where: { imageID } });
    if (!isImgInDb) {
      return res.status(400).json(failerResponse("Image is not uploaded!"));
    }
    const doesProductExist = await Product.findOne({ where: { product_Id } });
    if (!doesProductExist) {
      return res.status(404).json(failerResponse("Product not found !"));
    }
    const data = {
      productName,
      productPrice,
      productDescription,
      inStock,
      category_Id,
      imageID,
    };
    const result = await Product.update(data, { where: { product_Id } });
    if (result) {
      return res
        .status(201)
        .json(successResponse("Product Updated successfully !", data));
    }
  } catch (err) {
    next(err);
  }
};
