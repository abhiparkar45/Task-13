const db = require("../models/index");
const Order = db.Orders;
const Product = db.Products;
const successResponse = require("../responseBuilder/successResponse");
const failerResponse = require("../responseBuilder/failerResponse");

exports.createOrder = async (req, res, next) => {
  const user = await req.user;
  const product_Id = await req.params.id;
  const product = await Product.findOne({ where: { product_Id } });
  if (!product) {
    return res.status(404).json(failerResponse("Product does not exists !"));
  }
  const result = await Order.create({
    product_Id,
    user_Id: user.id,
    productPrice: product.productPrice,
  });
  if (result) {
    return res
      .status(201)
      .json(successResponse("Order placed successfully !", result));
  }
};
