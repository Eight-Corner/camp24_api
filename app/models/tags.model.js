'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Tags extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // models.Tags.belongsTo(models.Member, {foreignKey: 'tag_id'})
            // Tags.associate = models => {
            //     Tags.hasOne(models.Member, {
            //         foreignKey: 'member_id',
            //         sourceKey: 'id'
            //     });
            //     Tags.belongsTo(models.Member, {
            //         foreignKey: 'tag_id',
            //         sourceKey: 'id'
            //     });
            // }
            // define association here
        }
    }
    
    Tags.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            comment: '태그 ID',
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
