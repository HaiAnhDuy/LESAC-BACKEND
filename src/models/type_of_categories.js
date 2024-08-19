'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Type_Of_Categories extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Type_Of_Categories.init({
        name: DataTypes.STRING,
        id_categories: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Type_Of_Categories',
    });
    return Type_Of_Categories;
};