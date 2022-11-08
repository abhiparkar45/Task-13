"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Orders.belongsTo(models.Products, {
        foreignKey: "product_Id",
        onDelete: "no action",
        onUpdate: "no action",
      });
      Orders.belongsTo(models.Users, {
        foreignKey: "user_Id",
        onDelete: "no action",
        onUpdate: "no action",
      });
    }
  }
  Orders.init(
    {
      order_Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      product_Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_Id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      paranoid: true,
      modelName: "Orders",
      tableName: "ec_orders",
    }
  );
  return Orders;
};
