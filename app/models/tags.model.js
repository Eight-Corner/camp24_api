'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Tags extends Model {
        static associate(models) {
            // models.Tags.belongsTo(models.Member, {foreignKey: 'tag_id'});
        }
    }
    
    Tags.init({
        tag_no: {
            field: 'tag_no',
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        tag: {
            field: 'tag',
            type: DataTypes.STRING(50),
        },
    }, {
        sequelize,
        createdAt: false,
        updatedAt: false,
        modelName: 'Tags',
    });
   /* Tags.associate = function (models) {
        Tags.belongsTo(models.Member, {
            foreignKey: "tag_no",
        })
    }*/
    return Tags;
};
