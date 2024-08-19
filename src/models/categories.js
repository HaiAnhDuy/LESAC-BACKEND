'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Categories extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Categories.belongsTo(models.Allcode, { foreignKey: 'activeId', targetKey: 'keyMap', as: 'ActiveData' }),
                Categories.hasOne(models.Product, { foreignKey: 'id_categories', as: 'CategoriesData' })


        }
    };
    Categories.init({
        name_categories: DataTypes.STRING,
        image: DataTypes.STRING,

        activeId: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Categories',
    });
    return Categories;
};