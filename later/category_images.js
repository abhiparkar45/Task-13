'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category_images extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Category_images.init({
    id:{
      primaryKey:true,
      type:DataTypes.INTEGER,
      allowNull:false,
      autoIncrement:true
    },
    categoryId:{
      type:DataTypes.INTEGER
    },
    imageId:{
      type:DataTypes.INTEGER,
      defaultValue:null,
      allowNull:true
    }
  }, {
    sequelize,
    timestamps:false,
    tableName:'category_images',
    modelName: 'Category_images',
  });
  return Category_images;
};