const db = require("../models/index");
const User = db.Users;
const Role = db.Roles;
const bcrypt = require("bcrypt");
const failerResponse = require("../responseBuilder/failerResponse");
const successResponse = require("../responseBuilder/successResponse");
const sendMail = require("../utils/sendMail");
const moment = require("moment");

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
    const createdData = {
      firstName: result.firstName,
      lastName: result.lastName,
      username: result.username,
      age: result.age,
      email: result.email,
      phone: result.phone,
    };
    if (result) {
      return res
        .status(201)
        .json(successResponse("User registered successfully !", createdData));
    }
  } catch (err) {
    console.log(err);
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
  try {
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
          otp: otp,
          otp_generation_timestamp: new Date(),
        },
        { where: { email } }
      );
      if (saveOTP) {
        const sent = await sendMail(
          email,
          "hello",
          `hello, your OTP is ${otp}`
        );
        res.status(200).json(sent);
      }
    } else {
      return res.status(404).json(failerResponse("Incorrect Email !"));
    }
  } catch (err) {
    next(err);
  }
};
exports.verifyOTP = async (req, res, next) => {
  const email = await req.body.email;
  const otp = await req.body.otp;

  const user = await User.findOne({ where: { email } });
  if (user.otp == otp) {
    const makeVerifiedUser = await User.update(
      {
        otp: null,
        otp_generation_timestamp: null,
        verified_timestamp: new Date(),
        user_IP: req.ip,
      },
      { where: { email } }
    );
    if (makeVerifiedUser) {
      const response = {
        user_Id: user.user_Id,
        userName: user.firstName,
        lastName: user.lastName,
        userName: user.username,
        age: user.age,
        email: user.email,
        phone: user.phone,
      };
      return res
        .status(200)
        .json(successResponse("OTP matched succesfully !", response));
    }
  } else {
    return res.status(400).json(failerResponse("Invalid OTP !"));
  }
};
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: [
        "user_Id",
        "firstName",
        "lastName",
        "username",
        "age",
        "email",
        "phone",
      ],
      include: [
        {
          model: Role,
          attributes: ["roleName"],
        },
      ],
    });
    res.status(200).json({ users });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
exports.updatePassword = async (req, res, next) => {
  const body = await req.body;
  const email = await body.email;
  const newPassword = await body.newPassword;

  const exist = await User.findOne({ where: { email } });
  if (!exist) {
    return res.status(404).json(failerResponse("User does not exists !"));
  }
  const userIP = await req.ip;
  if (userIP !== exist.user_IP) {
    return res.status(400).json(failerResponse("Unknown device detected !"));
  }
  const currentDateString = moment(new Date());
  const verified_timestamp = moment(await exist.verified_timestamp);
  if (currentDateString.diff(verified_timestamp) > 600000) {
    return res
      .status(400)
      .json(
        failerResponse(
          "You have to update Password before completion of 10 minutes from OTP verification !"
        )
      );
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(newPassword, salt);
  const updateNewPassword = await User.update(
    { password: hashedPass, verified_timestamp: null, user_IP: null },
    { where: { email } }
  );
  if (updateNewPassword) {
    return res
      .status(200)
      .json(successResponse("Password Updated Successfully !", true));
  }
};
