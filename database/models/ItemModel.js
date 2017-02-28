const Sequelize = require('sequelize');

/* eslint new-cap: ["error", {"capIsNew": false}] */

/** Class representing a Pushendpoint model for sequelize. */
class ItemModel {

    /**
    * @constructor
    * @param {Object} sequelize The Sequelize object.
    */
  constructor(sequelize) {
    this.Item = sequelize.define('item', {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        field: 'id',
        allowNull: false,
        unique: true,
        autoIncrement: true,
      },
      barcode: {
        type: Sequelize.STRING,
        field: 'barcode',
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        field: 'name',
        allowNull: false,
      },
    }, {
      freezeTableName: true, //Model tableName will be same as model name
    });
  }
}

module.exports = {ItemModel};
