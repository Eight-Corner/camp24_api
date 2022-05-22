'use strict';

const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Member extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // models.Member.hasMany(models.Tags, {foreignKey: "tag_id"});
            
            // define association here
        }
    }
    
    Member.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            comment: '사용자 ID',
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: false,
            comment: '사용자 로그인 닉네임'
        },
        nickname: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: false,
            comment: '사용자 닉네임'
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: false,
            comment: '사용자 이메일'
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: false,
            comment: '사용자 비밀번호'
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: false,
            comment: '사용자 지역'
        },
      
    }, {
        sequelize,
        modelName: 'Member',
    });
    // Member.hasMany(models.Users, {foreignKey : "company_id", sourceKey:"id"});
    // Member.associate = models => {
    //     Member.hasMany(models.Tags, {
    //         foreignKey: 'tag_id',
    //         sourceKey: 'id',
    //         onDelete: 'cascade',
    //     });
    // };
    return Member;
};

/*module.exports = (sequelize, DataTypes) => {
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
}*/
/*
// 생성자
const Member = function(member) {
    this._id = member._id;
    this.name = member.name;
    this.nickname = member.nickname;
    this.email = member.email;
    this.password = member.password;
    this.address = member.address;
    this.tags = member.tags;
}

Member.getAll = async res => {
     
        const members = await Member.findAll();
        const result = [];
        
        for (const member of members) {
            result.push({
                id: member._id,
                name: member.name,
                nickname: member.nickname,
                address: member.address,
            });
        }
        res.send(result);
}

module.exports = Member;*/
