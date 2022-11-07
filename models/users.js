'use strict';
const {
  Model
} = require('sequelize');
const jwt = require('jsonwebtoken');
const config = require('config');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users.init({
    user_Id:{
      primaryKey:true,
      type:DataTypes.INTEGER,
      allowNull:false,
      autoIncrement:true
    },
    firstName:{
      type: DataTypes.STRING,
      allowNull:false,
    },
    lastName:{
      type: DataTypes.STRING,
      allowNull:false,
    },
    username: {
      type: DataTypes.STRING,
      unique:true,
      allowNull: false
    },
    age:{
      type:DataTypes.TINYINT,
      allowNull:false
    },
    email: {
      type: DataTypes.STRING,
      unique:true,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      unique:true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isAdmin:{
      type:DataTypes.BOOLEAN,
      defaultValue:false,
      allowNull:true
    }
  }, {
    sequelize,
    modelName: 'Users',
    tableName: 'ec_users'
  });

  Users.generateAuthToken = (id,isAdmin) => {
    const token = jwt.sign({ id,isAdmin }, config.get('jwtPrivateKey'));
    return token;
  }
  return Users;
};