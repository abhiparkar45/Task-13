const config = require('config');
const jwt = require('jsonwebtoken');
const successResponse = require('../responseBuilder/successResponse');
const failerResponse = require('../responseBuilder/failerResponse');

module.exports = (req, res, next) => {
    const token = req.header('x-auth-token');
    if(!token){
        return res.status(401).json(failerResponse("Access denied ! no token provided !"))
    }
    try{
        const decoded = jwt.verify(token,config.get('jwtPrivateKey'));
        req.user = decoded;
        next();
    }catch(ex){
        return res.status(401).json(failerResponse("Invaild token !"))
    }
}