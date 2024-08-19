'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Allcode extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Allcode.hasMany(models.User, { foreignKey: 'roleId', as: 'RoleData' }),

                Allcode.hasMany(models.User, { foreignKey: 'gender', as: 'GenderData' }),

                Allcode.hasOne(models.Color_Product, { foreignKey: 'colorType', as: 'colorTypeData' }),
                Allcode.hasOne(models.Product, { foreignKey: 'activeId', as: 'ActiveData' }),
                Allcode.hasOne(models.Product, { foreignKey: 'lastId', as: 'LastData' })



        }
    };
    Allcode.init({
        keyMap: DataTypes.STRING,
        type: DataTypes.STRING,
        valueVi: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Allcode',
    });
    return Allcode;
};