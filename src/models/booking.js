'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Booking extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Booking.init({
        status: DataTypes.STRING,
        id_user: DataTypes.INTEGER,
        id_product: DataTypes.INTEGER,
        token: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Booking',
        freezeTableName: true

    });
    return Booking;
};