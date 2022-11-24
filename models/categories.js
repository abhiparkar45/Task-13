"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Categories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Categories.hasMany(models.Products, {
        foreignKey: "category_Id",
        onDelete: "set null",
        onUpdate: "cascade",
      });
      Categories.belongsTo(models.Images, {
        foreignKey: "imageID",
        // onDelete: "set null",
        // onUpdate: "cascade",
      });
    }
  }
  Categories.init(
    {
      category_Id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
      },
      categoryName: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      imageID: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Categories",
      tableName: "ec_categories",
    }
  );
  return Categories;
};
