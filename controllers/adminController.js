const db = require("../models/index");
const User = db.Users;
const bcrypt = require("bcrypt");
const failerResponse = require("../responseBuilder/failerResponse");
const successResponse = require("../responseBuilder/successResponse");

exports.createAdmin = async (req, res, next) => {
  try {
    const user = await req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(user.password, salt);
    const doesUsernameExist = await User.findOne({
      where: { username: user.userName },
    });
    if (doesUsernameExist) {
      return res.status(400).json(failerResponse("Username already exists !"));
    }
    const doesEmailExist = await User.findOne({ where: { email: user.email } });
    if (doesEmailExist) {
      return res
        .status(400)
        .json(failerResponse("Email is already registered !"));
    }
    const doesPhoneExist = await User.findOne({ where: { phone: user.phone } });
    if (doesPhoneExist) {
      return res
        .status(400)
        .json(failerResponse("Phone number already registered !"));
    }
    const data = {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.userName,
      age: user.age,
      email: user.email,
      phone: user.phone,
      password: hashedPass,
      isAdmin: true,
    };

    const result = await User.create(data);
    if (result) {
      return res
        .status(201)
        .json(successResponse("User registered successfully !", result));
    }
  } catch (err) {
    next(err);
  }
};
exports.makeAdmin = async (req, res, next) => {
  try {
    const user = await req.body;
    const userId = await req.params.id;
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(user.password, salt);
    const doesUsernameExist = await User.findOne({
      where: { user_Id: userId },
    });
    if (!doesUsernameExist) {
      return res.status(404).json(failerResponse("User does not exists !"));
    }
    const data = {
      user_Id: userId,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.userName,
      age: user.age,
      email: user.email,
      phone: user.phone,
      password: hashedPass,
      isAdmin: true,
    };
    const result = await User.update(data, {
      where: { user_Id: userId },
    });
    if (result) {
      return res
        .status(200)
        .json(successResponse("Promoted to admin successfully !", result));
    }
  } catch (err) {
    next(err);
  }
};
