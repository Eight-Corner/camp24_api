/*
'use strict';
const {
  Model
} = require('sequelize');
const sql = require("./db");
module.exports = (sequelize, DataTypes) => {
  class Members extends Model {
    /!**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     *!/
    static associate(models) {
      // define association here
    }
  }
  Members.init({
    name: DataTypes.STRING,
    nickname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    tags: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Members',
  });
  return Members;
};

*/
module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
      'Member',
      {
        _id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          comment: '사용자 ID'
        },
        name: {
          type: DataTypes.STRING,
          comment: '사용자 로그인 닉네임'
        },
        nickname: {
          type: DataTypes.STRING,
          comment: '사용자 닉네임'
        },
        email: {
          type: DataTypes.STRING,
          comment: '사용자 이메일'
        },
        password: {
          type: DataTypes.STRING,
          comment: '사용자 비밀번호'
        },
        address: {
          type: DataTypes.STRING,
          comment: '사용자 지역'
        },
        tags: {
          type: DataTypes.STRING,
          comment: '사용자 관심태그'
        }
      },
      {
        timestamps: false
      }
  )
}
