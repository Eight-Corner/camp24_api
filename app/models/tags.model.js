'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Tags extends Model {
        static associate(models) {
            models.Tags.belongsTo(models.Member, {foreignKey: 'tag_id'});
        }
    }
    
    Tags.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            comment: '태그 고유키값',
        },
        tag1: {
            field: 'tag1',
            type: DataTypes.STRING(10),
        },
        tag2: {
            field: 'tag2',
            type: DataTypes.STRING(10),
        },
        tag3: {
            field: 'tag3',
            type: DataTypes.STRING(10),
        },
        tag4: {
            field: 'tag4',
            type: DataTypes.STRING(10),
        },
        tag5: {
            field: 'tag5',
            type: DataTypes.STRING(10),
        },
    }, {
        sequelize,
        modelName: 'Tags',
    });
    return Tags;
};
