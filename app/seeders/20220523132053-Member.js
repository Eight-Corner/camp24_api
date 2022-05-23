'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const tagId = await queryInterface.bulkInsert(
        "Member",
        [
          {
            "name": "rlgns",
            "nickname": "기훈쨩",
            "email": "corner@gmail.com",
            "password": "qwer1234",
            "address": "경기",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            "name": "rlgns2",
            "nickname": "기훈쨩2",
            "email": "corner2@gmail.com",
            "password": "qwer1234",
            "address": "서울",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            "name": "rlgns3",
            "nickname": "기훈쨩3",
            "email": "corner3@gmail.com",
            "password": "qwer1234",
            "address": "경북",
            createdAt: new Date(),
            updatedAt: new Date(),
          }
        ],
        { returning: ["id"] }
    );
    await queryInterface.bulkInsert("Tags", [
      {
        "tag1": "경기",
        "tag2": "캠핑",
        "tag3": "노지",
        "tag4": "유료",
        "tag5": "계곡",
        createdAt: new Date(),
        updatedAt: new Date(),
        tag_id: tagId,
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Member", null, {});
    await queryInterface.bulkDelete("Tags", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
