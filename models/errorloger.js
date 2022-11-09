"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ErrorLoger extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ErrorLoger.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      err_name: {
        type: DataTypes.STRING,
      },
      err_message: {
        type: DataTypes.STRING,
      },
      err_type: {
        type: DataTypes.STRING,
      },
      err_value: {
        type: DataTypes.STRING,
      },
      sqlMessage: {
        type: DataTypes.STRING,
      },
      sqlQuery: {
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "ErrorLoger",
      tableName: "ec_errors",
    }
  );
  return ErrorLoger;
};
