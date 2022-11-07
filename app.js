const express = require('express');
const categories = require('./routes/categories');
const products = require('./routes/products');
const user = require('./routes/users');

const app = express();
app.use(express.json());
app.use('/api/categories',categories);
app.use('/api/products',products);
app.use('/api/user',user);

module.exports = app;