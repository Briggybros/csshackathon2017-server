const Sequelize = require('sequelize');

/* eslint new-cap: ["error", {"capIsNew": false}] */

/** Class representing a Pushendpoint model for sequelize. */
export class ItemModel {

    /**
    * @constructor
    * @param {Object} sequelize The Sequelize object.
    */
  constructor(sequelize) {
    this.Item = sequelize.define('item', {
      id: {
        primaryKey: true,
        type: Sequelize.STRING,
        field: 'id',
        allowNull: false,
        unique: true,
        autoIncrement: true,
      },
      barcode: {
        type: Sequelize.INTEGER,
        field: 'barcode',
      },
      component: {
        type: Sequelize.STRING,
        field: 'component',
      },
    }, {
      freezeTableName: true, //Model tableName will be same as model name
    });
  }
}
