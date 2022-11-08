const express = require('express');
const categories = require('./routes/categories');
const products = require('./routes/products');
const user = require('./routes/users');

const app = express();
app.use(express.json());
app.use('/api/categories', categories);
app.use('/api/products', products);
app.use('/api/user', user);

app.use((err, req, res, next) => {
    return res.status(500).json({ error: err })
});

process.on('uncaughtException',(err)=>{
    console.error((new Date).toUTCString()+'uncaughtException:',err.message);
    process.exit(1);
});

process.on('unhandledRejection',(err)=>{
    console.error((new Date).toUTCString()+'unhandledRejection:',err.message);
    process.exit(1);
})

module.exports = app;