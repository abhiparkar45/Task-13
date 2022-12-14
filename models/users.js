"use strict";
const { Model } = require("sequelize");
const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Users.hasMany(models.Orders, {
      //   foreignKey: "user_Id",
      //   onDelete: "cascade",
      //   onUpdate: "cascade",
      // });
      Users.belongsTo(models.Roles, {
        foreignKey: "roleId",
        //   onDelete: "restrict",
        //   onUpdate: "cascade",
      });
      Users.belongsToMany(models.Products, {
        through: models.Orders,
        // foreignKey: "user_Id",
        // otherKey: "product_Id",
      });
    }
  }
  Users.init(
    {
      user_Id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      roleId: {
        type: DataTypes.INTEGER,
        defaultValue: 2,
        allowNull: false,
      },
      otp: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
      otp_generation_timestamp: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
      verified_timestamp: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
      user_IP: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
    },
    {
      sequelize,
      paranoid: true,
      modelName: "Users",
      tableName: "ec_users",
    }
  );

  Users.generateAuthToken = (id, roleId) => {
    const token = jwt.sign({ id, roleId }, config.get("jwtPrivateKey"), {
      expiresIn: "24h",
    });
    return token;
  };
  return Users;
};
