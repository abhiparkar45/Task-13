const successResponse = require('../responseBuilder/successResponse');
const failerResponse = require('../responseBuilder/failerResponse');


module.exports = (req, res, next) => {
    if(!req.user.isAdmin){
        return res.status(403).json(failerResponse("forbidden !"));
    }
    next();
}