// const { where } = require("sequelize");
const db = require("../models/index");
const Product = db.Products;
const Image = db.Images;
const Category = db.Categories;
const Documents = db.Documents;
const failerResponse = require('../responseBuilder/failerResponse');
const successResponse = require('../responseBuilder/successResponse');


exports.uploadProductImage = async (req, res, next) => {
    const imgName = await req.file.filename;
    const path = await req.file.path;
    const imgURL = `http://ecommerce.com/uploads/${path}`;
    const data = {
        imgName: imgName,
        imgURL: imgURL
    }
    const result = await Image.create(data);
    if (result.dataValues) {
        return res.status(201).json(successResponse("Image uploaded successfully !", result.dataValues));
    }
}
exports.createProduct = async (req, res, next) => {
    const requestBody = await req.body;
    const productName = requestBody.productName;
    const productPrice = requestBody.productPrice;
    const productDescription = requestBody.productDescription;
    const inStock = requestBody.inStock;
    const category_Id = requestBody.category_Id;
    const imageID = requestBody.imageID;
    const doesCategoryExist = await Category.findOne({ where: { category_Id } });
    if (!doesCategoryExist) {
        return res.status(400).json(failerResponse("Invalid category !"))
    }
    const isImgInDb = await Image.findOne({ where: { imageID } });

    if (!isImgInDb) {
        return res.status(400).json(failerResponse("Image is not uploaded!"));
    }

    const doesExist = await Product.findOne({ where: { productName } });
    if (doesExist) {
        return res.status(400).json(failerResponse("Product already exist !"));
    }
    const data = { productName, productPrice, productDescription, inStock, category_Id, imageID }
    const result = await Product.create(data);
    if (result) {
        return res.status(201).json(successResponse("Product added successfully !", result));
    }
}
exports.getProducts = async (req, res, next) => {

    const Products = await Product.findAll(
        // {
        //     include: [
        //         {
        //             model: Category
        //         }
        //     ]
        // }
    );
    res.status(200).json(successResponse("Products retrieved successfully !", Products));
}
exports.uploadProductDocument = async (req, res, next) => {
    const docs = await req.files;
    const product_Id = await req.body.product_Id;
    let success = true;
    let results = [];
    for(let i = 0;i<docs.length;i++){
        const docName = docs[i].filename;
        const docType = docs[i].mimetype;
        const docURL = `http://ecommerce.com/uploads/${docs[i].path}`;
        const data = {product_Id,docName, docType, docURL};
        const x  = await Documents.create(data);
        console.log(`response:${x}`);
        // if(response){
        //     // console.log(`response:${response}`);
        //     results.push(response);
        // }
        // else{
        //     success = false;
        //     break; 
        // }
    }
    console.log(`result:${results}`);
    // if(!result){
    //     return res.status(400).json(failerResponse("Something went wrong !"));
    // }
    // else{
    //     return res.status(200).json(successResponse("Documents uploaded successfully !",result))
    // }
}
exports.deleteProduct = async (req, res, next) => {
    const product_Id = await req.params.id;
    const productExist = await Product.findOne({where:{product_Id}});
    if(!productExist){
        return res.status(404).json(failerResponse("Product not found !"));
    }
    const result =Product.destroy({where:{product_Id}});
    if(result){
        return res.status(200).json(successResponse("Product Deleted successfully !",productExist));
    }
}
exports.getSingleProduct = async (req, res, next) => {
    const product_Id = await req.params.id;
    const productExist = await Product.findOne({where:{product_Id}});
    if(!productExist){
        return res.status(404).json(failerResponse("Product not found !"));
    }
    else{
        res.status(200).json(successResponse("Product Retrieved successfully !",productExist))
    }
}
exports.updateProduct = async (req, res, next) => {
    const product_Id = await req.params.id;
    const requestBody = await req.body;
    const productName = requestBody.productName;
    const productPrice = requestBody.productPrice;
    const productDescription = requestBody.productDescription;
    const inStock = requestBody.inStock;
    const category_Id = requestBody.category_Id;
    const imageID = requestBody.imageID;
    const doesCategoryExist = await Category.findOne({ where: { category_Id } });
    if (!doesCategoryExist) {
        return res.status(400).json(failerResponse("Invalid category !"))
    }
    const isImgInDb = await Image.findOne({ where: { imageID } });
    if (!isImgInDb) {
        return res.status(400).json(failerResponse("Image is not uploaded!"));
    }
    const doesProductExist = await Product.findOne({where:{product_Id}});
    if(!doesProductExist){
        return res.status(404).json(failerResponse("Product not found !"));
    }
    const data = { productName, productPrice, productDescription, inStock, category_Id, imageID }
    const result = await Product.update(data,{where:{product_Id}});
    if (result) {
        return res.status(201).json(successResponse("Product Updated successfully !", data));
    }
}