const { where } = require("sequelize");
const db = require("../models/index");
const Category = db.Categories;
const Product = db.Products;
const Image = db.Images;
const failerResponse = require("../responseBuilder/failerResponse");
const successResponse = require("../responseBuilder/successResponse");

exports.createCategory = async (req, res, next) => {
  try {
    const categoryName = await req.body.categoryName;
    const imageID = await req.body.imageID;

    const isImgInDb = await Image.findOne({ where: { imageID } });
    if (!isImgInDb) {
      return res.status(400).json(failerResponse("Image is not uploaded!"));
    }
    const doesExist = await Category.findOne({ where: { categoryName } });

    if (doesExist) {
      return res.status(400).json(failerResponse("Category already exists !"));
    }
    const result = await Category.create({ categoryName, imageID });
    if (result) {
      return res
        .status(201)
        .json(successResponse("Category created successfully !", result));
    }
  } catch (error) {
    next(error);
  }
};
exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.findAll();
    return res.status(200).json(categories);
  } catch (err) {
    next(err);
  }
};
exports.uploadCategoryImage = async (req, res, next) => {
  try {
    const imgName = await req.file.filename;
    const path = await req.file.path;
    const imgURL = `http://ecommerce.com/uploads/${path}`;
    const data = {
      imgName: imgName,
      imgURL: imgURL,
    };
    const result = await Image.create(data);
    if (result.dataValues) {
      return res
        .status(201)
        .json(
          successResponse("Image uploaded successfully !", result.dataValues)
        );
    }
  } catch (err) {
    next(err);
  }
};
exports.getCategory = async (req, res, next) => {
  try {
    const categoryId = await req.params.id;
    const category = await Category.findOne({
      where: { category_Id: categoryId },
      include: [
        {
          model: Image,
        },
      ],
    });
    if (!category) {
      return res.status(404).json(failerResponse("Category not found !"));
    } else {
      return res
        .status(200)
        .json(successResponse("Category retrieved successfully !", category));
    }
  } catch (err) {
    next(err);
  }
};
exports.deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findOne({
      where: { category_Id: req.params.id },
    });
    if (!category) {
      return res.status(404).json(failerResponse("Category Not Found !"));
    }
    const deletedCategory = await Category.destroy({
      where: { category_Id: req.params.id },
    });
    if (deletedCategory) {
      return res
        .status(200)
        .json(successResponse("Category deleted successfully !", category));
    }
  } catch (err) {
    next(err);
  }
};
exports.updateCategory = async (req, res, next) => {
  try {
    const category_Id = await req.params.id;
    const imageID = await req.body.imageID;
    const category = await Category.findOne({
      where: { category_Id },
    });
    if (!category) {
      return res.status(404).json(failerResponse("Category Not Found !"));
    }
    const isImgInDb = await Image.findOne({
      where: { imageID },
    });
    if (!isImgInDb) {
      return res.status(400).json(failerResponse("Image is not uploaded!"));
    }
    const newCategory = {};
    newCategory.category_Id = await req.params.id;
    newCategory.categoryName = await req.body.categoryName;
    newCategory.imageID = await req.body.imageID;
    const result = await Category.update(newCategory, {
      where: { category_Id: req.params.id },
    });
    if (result) {
      res
        .status(200)
        .json(successResponse("Category updated Successfully !", newCategory));
    }
  } catch (err) {
    next(err);
  }
};
