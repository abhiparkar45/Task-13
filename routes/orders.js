const express = require("express");
const router = express.Router();
const { createOrder } = require("../controllers/orderController");
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");

router.post("/order", auth, createOrder);
