'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Image_Product extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // Image_Product.hasMany(models.Product, { foreignKey: 'id', as: 'ImageData' })
            // Image_Product.belongsTo(models.Product, { foreignKey: 'id_product', targetKey: 'id', as: 'ImageDataId' })

        }
    };
    Image_Product.init({

        id_product: DataTypes.INTEGER,
        image: DataTypes.STRING,



    }, {
        sequelize,
        modelName: 'Image_Product',
        freezeTableName: true
    });
    return Image_Product;
};