const Sequelize = require('sequelize');

/* eslint new-cap: ["error", {"capIsNew": false}] */

/** Class representing a Pushendpoint model for sequelize. */
class InstructionModel {

    /**
    * @constructor
    * @param {Object} sequelize The Sequelize object.
    */
  constructor(sequelize) {
    this.Instruction = sequelize.define('instruction', {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        field: 'id',
        allowNull: false,
        unique: true,
        autoIncrement: true,
      },
      instruction: {
        type: Sequelize.STRING,
        field: 'instruction',
      },
      authId: {
        type: Sequelize.STRING,
        field: 'authId',
      },
    }, {
      freezeTableName: true, //Model tableName will be same as model name
    });
  }
}

module.exports = {InstructionModel};
