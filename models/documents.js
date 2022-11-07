'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Documents extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Documents.init({
    docID: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true
    },
    product_Id: { 
      type: DataTypes.INTEGER 
    },
    docName: {
      type:DataTypes.STRING,
      allowNull:false
    },
    docType:{
      type:DataTypes.STRING,
      allowNull:false
    },
    docURL: {
      type:DataTypes.STRING,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Documents',
    tableName: 'ec_documents'
  });
  return Documents;
};