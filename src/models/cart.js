'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Cart extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Cart.init({
        id_user: DataTypes.INTEGER,
        id_product: DataTypes.INTEGER,
        name_product: DataTypes.STRING,
        image: DataTypes.STRING,
        color: DataTypes.STRING,
        quantity: DataTypes.INTEGER,
        price: DataTypes.INTEGER,
        total: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Cart',
        freezeTableName: true

    });
    return Cart;
};