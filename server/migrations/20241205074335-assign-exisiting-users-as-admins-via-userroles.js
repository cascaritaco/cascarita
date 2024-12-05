"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      const [existingAdminRole] = await queryInterface.sequelize.query(
        `SELECT id FROM Roles WHERE role_type = 'Admin'`,
        { type: Sequelize.QueryTypes.SELECT },
      );

      let adminRoleId;

      if (existingAdminRole) {
        adminRoleId = existingAdminRole.id;
      } else {
        await queryInterface.sequelize.query(
          `INSERT INTO Roles (role_type, created_at, updated_at)
           VALUES ('Admin', NOW(), NOW())`,
        );

        const [result] = await queryInterface.sequelize.query(
          `SELECT id FROM Roles WHERE role_type = 'Admin'`,
          { type: Sequelize.QueryTypes.SELECT },
        );

        adminRoleId = result.id;
      }

      const users = await queryInterface.sequelize.query(
        `SELECT id FROM Users`,
        { type: Sequelize.QueryTypes.SELECT },
      );

      const userRoles = users.map((user) => ({
        user_id: user.id,
        role_id: adminRoleId,
        created_at: new Date(),
        updated_at: new Date(),
      }));

      await queryInterface.bulkInsert("UserRoles", userRoles);
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      const [adminRole] = await queryInterface.sequelize.query(
        `SELECT id FROM Roles WHERE role_type = 'Admin'`,
        { type: Sequelize.QueryTypes.SELECT },
      );

      if (adminRole) {
        await queryInterface.bulkDelete("UserRoles", { role_id: adminRole.id });

        await queryInterface.bulkDelete("Roles", { id: adminRole.id });
      }
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
