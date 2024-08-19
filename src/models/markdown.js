'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Markdown extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Markdown.hasOne(models.Product, { foreignKey: 'id', as: 'MarkData' })

        }
    };
    Markdown.init({
        id_product: DataTypes.INTEGER,
        id_categroies: DataTypes.INTEGER,
        id_type_of_categroies: DataTypes.INTEGER,
        contentHTML: DataTypes.TEXT('long'),
        contentMarkdown: DataTypes.TEXT('long'),

    }, {
        sequelize,
        modelName: 'Markdown',
        freezeTableName: true

    });
    return Markdown;
};