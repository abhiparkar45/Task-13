'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.Users,{
        foreignKey:'user_Id'
      });
      Order.hasMany(models.Products,{
        foreignKey:'product_Id'
      });
    }
  }
  Order.init({
    order_Id:{
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true
    },
    user_Id:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    product_Id:{
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};