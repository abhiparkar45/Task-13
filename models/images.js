'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Images extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Images.hasOne(models.Products,{foreignKey:'imageID',onDelete:'set null',onUpdate:'cascade'});
      Images.hasOne(models.Categories,{foreignKey:'imageID',onDelete:'set null',onUpdate:'cascade'});
      }
  }
  Images.init({
    imageID:{
      primaryKey:true,
      type:DataTypes.INTEGER,
      allowNull:false,
      autoIncrement:true
    },
    imgName:{
      type: DataTypes.STRING,
      allowNull:false
    },
    imgURL: {
      type:DataTypes.STRING,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Images',
    tableName: 'ec_images'
  });
  return Images;
};