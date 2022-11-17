const db = require("../models/index");
const User = db.Users;
const bcrypt = require("bcrypt");
const failerResponse = require("../responseBuilder/failerResponse");
const successResponse = require("../responseBuilder/successResponse");
const sendMail = require("../utils/sendMail");
const { deleteOTP } = require("../utils/cron");

exports.createUser = async (req, res, next) => {
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
exports.authenticateUser = async (req, res, next) => {
  try {
    const email = await req.body.email;
    const password = await req.body.password;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res
        .status(400)
        .json(failerResponse("Invalid username or password !"));
    }
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      return res
        .status(400)
        .json(failerResponse("Invalid username or password !"));
    }
    const token = await User.generateAuthToken(user.user_Id, user.roleId);
    if (token) {
      return res
        .status(200)
        .json(successResponse("User logged in successfully !", token));
    }
  } catch (err) {
    next(err);
  }
};
exports.forgotPassword = async (req, res, next) => {
  const email = await req.body.email;

  var validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const result = email.match(validRegex);

  if (!result) {
    return res.status(400).json(failerResponse("Invalid email"));
  }
  const userRegistered = await User.findOne({ where: { email } });
  if (userRegistered) {
    const otp = Math.floor(1000 + Math.random() * 9000);
    const saveOTP = await User.update(
      {
        firstName: userRegistered.firstName,
        lastName: userRegistered.lastName,
        username: userRegistered.username,
        age: userRegistered.age,
        email: userRegistered.email,
        phone: userRegistered.phone,
        password: userRegistered.password,
        roleId: userRegistered.roleId,
        otp: otp,
        otp_generation_timestamp: new Date(),
      },
      { where: { email } }
    );
    if (saveOTP) {
      const sent = await sendMail(email, "hello", `hello, your OTP is ${otp}`);
      res.status(200).json(sent);
    }
  } else {
    return res.status(404).json(failerResponse("Incorrect Email !"));
  }
};
exports.verifyOTP = async (req, res, next) => {
  const email = await req.body.email;
  const otp = await req.body.otp;

  const user = await User.findOne({ where: { email } });
  if (user.otp == otp) {
    return res
      .status(200)
      .json(successResponse("OTP matched succesfully !", user));
  } else {
    return res.status(400).json(failerResponse("Invalid OTP !"));
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).json({ users });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
