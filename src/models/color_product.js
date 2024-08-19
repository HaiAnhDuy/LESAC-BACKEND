'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Color_Product extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Color_Product.hasMany(models.Product, { foreignKey: 'id', as: 'ColorData' }),

                Color_Product.belongsTo(models.Allcode, { foreignKey: 'colorType', targetKey: 'keyMap', as: 'colorTypeData' })

            // Color_Product.hasOne(models.Image_Product, { foreignKey: 'id_product', as: 'ImageDataId' })


        }
    };
    Color_Product.init({

        id_product: DataTypes.INTEGER,
        code: DataTypes.STRING,
        colorType: DataTypes.STRING,



    }, {
        sequelize,
        modelName: 'Color_Product',
        freezeTableName: true
    });
    return Color_Product;
};