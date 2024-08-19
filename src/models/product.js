'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Product.belongsTo(models.Color_Product, { foreignKey: 'id', targetKey: 'id_product', as: 'ColorData' })
            Product.belongsTo(models.Categories, { foreignKey: 'id_categories', targetKey: 'id', as: 'CategoriesData' }),
                Product.belongsTo(models.Markdown, { foreignKey: 'id', targetKey: 'id_product', as: 'MarkData' }),
                Product.belongsTo(models.Allcode, { foreignKey: 'activeId', targetKey: 'keyMap', as: 'ActiveData' }),
                Product.belongsTo(models.Allcode, { foreignKey: 'lastId', targetKey: 'keyMap', as: 'LastData' })




            // Product.belongsTo(models.Image_Product, { foreignKey: 'id', targetKey: 'id_product', as: 'ImageData' }),
            // Product.hasMany(models.Image_Product, { foreignKey: 'id_product', as: 'ImageDataId' })



        }
    };
    Product.init({
        name_product: DataTypes.STRING,
        id_categories: DataTypes.INTEGER,
        price: DataTypes.INTEGER,
        discount: DataTypes.INTEGER,
        quantity: DataTypes.INTEGER,
        activeId: DataTypes.STRING,
        code_product: DataTypes.STRING,

        lastId: DataTypes.STRING,



    }, {
        sequelize,
        modelName: 'Product',
        freezeTableName: true
    });
    return Product;
};