const { where } = require("sequelize");
const db = require("../models/index");
const Category = db.Categories;
const Product = db.Products;
const Image = db.Images;
const failerResponse = require('../responseBuilder/failerResponse');
const successResponse = require('../responseBuilder/successResponse');

exports.createCategory = async(req, res) => {
    const categoryName = await req.body.categoryName;
    const imageID = await req.body.imageID;

    const isImgInDb = await Image.findOne({where: {imageID}});
    if(!isImgInDb){
        return res.status(400).json(failerResponse("Image is not uploaded!"));
    }
    const doesExist = await Category.findOne({where:{categoryName}})
    
    if(doesExist){
        return res.status(400).json(failerResponse("Category already exists !"))
    }
    const result = await Category.create({categoryName,imageID});
    if(result){
        return res.status(201).json(successResponse("Category created successfully !",result));
    }
}
exports.getCategories = async(req, res) => {
    // const categories = await Category.findAll({
    //     include: [
    //         {
    //             model: Image
    //         }
    //     ]
    // })
    const categories = await Category.findAll();
    return res.status(200).json(categories);
}
exports.uploadCategoryImage = async(req, res, next) => {
const imgName = await req.file.filename;
const path = await req.file.path;
const imgURL = `http://ecommerce.com/uploads/${path}`;
const data = {
    imgName:imgName,
    imgURL:imgURL
}
const result = await Image.create(data);
// const response = result.dataValues;
if(result.dataValues){
    return res.status(201).json(successResponse("Image uploaded successfully !",result.dataValues));
}
}
exports.getCategory = async(req, res) => {
    // const categories = await Category.findAll({
    //     include: [
    //         {
    //             model: Image
    //         }
    //     ]
    // })
    const categoryId = await req.params.id;
    const category = await Category.findOne({
        where:{category_Id:categoryId},
        include: [
            {
                model: Image
            }
        ]
    });
    return res.status(200).json(category);
}
exports.deleteCategory = async(req, res, next) =>{
    const category = await Category.findOne({where:{category_Id:req.params.id}});
    if(!category){
        return res.status(404).json(failerResponse("Category Not Found !"));
    }
    const deletedCategory = await Category.destroy({where:{category_Id:req.params.id}});
    if(deletedCategory){
        return res.status(200).json(successResponse("Category deleted successfully !",category))
    }
}
exports.updateCategory = async(req, res, next) => {
    const category = await Category.findOne({where:{category_Id:req.params.id}});
    if(!category){
        return res.status(404).json(failerResponse("Category Not Found !"));
    }
    const isImgInDb = await Image.findOne({where: {imageID:req.body.imageID}});
    if(!isImgInDb){
        return res.status(400).json(failerResponse("Image is not uploaded!"));
    }
    const newCategory = {};
    newCategory.category_Id = await req.params.id;
    newCategory.categoryName = await req.body.categoryName;
    newCategory.imageID = await req.body.imageID;
    const result = await Category.update(newCategory,{where:{category_Id:req.params.id}});
    if(result){
        res.status(200).json(successResponse("Category updated Successfully !",newCategory))
    }
}