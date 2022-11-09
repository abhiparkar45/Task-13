const failerResponse = require("../responseBuilder/failerResponse");
const db = require("../models/index");
const Role = db.Roles;

module.exports = async (req, res, next) => {
  const id = await req.user.roleId;
  const role = await Role.findOne({ where: { roleId: id } });
  if (role.dataValues.roleName === "Admin") {
    next();
  } else {
    return res.status(403).json(failerResponse("forbidden !"));
  }
};
