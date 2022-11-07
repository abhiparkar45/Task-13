'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Products.belongsTo(models.Images,{foreignKey:'category_Id',onDelete:'set null',onUpdate:'cascade'});
      Products.belongsTo(models.Categories,{foreignKey:'category_Id',onDelete:'set null',onUpdate:'cascade'});
      Products.hasMany(models.Documents,{foreignKey:'product_Id',onDelete:'cascade',onUpdate:'cascade'});
      // Products.hasOne(models.Images,{foreignKey:'imageID',onDelete:'set null',onUpdate:'cascade'});
      // Products.hasOne(models.Images,{foreignKey:'imageID',onDelete:'set null',onUpdate:'cascade'})
      // Products.belongsTo(models.Images,{foreignKey:'imageID',onDelete:'set null',onUpdate:'cascade'});
    }
  }
  Products.init({
    product_Id:{
      primaryKey:true,
      type:DataTypes.INTEGER,
      allowNull:false,
      autoIncrement:true
    },
    productName:{ 
     type: DataTypes.STRING,
     allowNull: false
    },
    productPrice:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productDescription:{
      type: DataTypes.STRING,
      allowNull: false
    },
    inStock:{
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    category_Id:{
      type: DataTypes.INTEGER
    },
    imageID: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Products',
    tableName: 'ec_products'
  });
  return Products;
};