'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class CampLocation extends Model {
		static associate(models) {
			// define association here
		}
	}

	CampLocation.init({
		
	}, {
		sequelize,
		modelName: 'Member',
		timestamps: true,
		charset: 'utf8mb4',
		collate: 'utf8mb4_general_ci',
	});

}
