"use strict";
const { Model } = require("sequelize");
const { Op } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Roles.hasMany(models.Users, {
        foreignKey: "roleId",
        onDelete: "restrict",
        onUpdate: "cascade",
      });
    }
  }
  Roles.init(
    {
      roleId: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
      },
      roleName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: "Roles",
      tableName: "ec_roles",
      hooks: {
        afterSync: async (sequelize) => {
          const exist = await Roles.findAll({
            where: {
              [Op.or]: [{ roleName: "Admin" }, { roleName: "Customer" }],
            },
          });
          if (exist.length == 0) {
            await Roles.bulkCreate([
              { roleId: 1, roleName: "Admin" },
              { roleId: 2, roleName: "Customer" },
            ]);
          }
        },
      },
    }
  );
  return Roles;
};
