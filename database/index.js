const Sequelize = require('sequelize');
const {MaterialModel} = require('./models/MaterialModel.js');
const {ItemModel} = require('./models/ItemModel.js');
const {InstructionModel} = require('./models/InstructionModel.js');

/** A class representing the database */
class Database {


  /**
  * @constructor
  */
  constructor() {
    this.createSequelize()
      .then(() => {
        return this.createModels();
      })
      .then(() => {
        return this.setupRelations();
      })
      .then(() => {
        this.sequelize.sync();
      });
  }

  /**
* @param {String} env The current environment.
* @return {Promise} A promise of a created database.
*/
createSequelize() {
  /* Use promise to return once database querying is complete. */
  return new Promise((resolve, reject) => {
    this.sequelize = new Sequelize('recyclapple', 'recyclapple', 'password', {
      dialect: 'sqlite',
      storage: './database.sqlite',
    });
    resolve();
  });
}

/**
  * @return {Promise} A promise of a database with tables.
  */
  createModels() {
    /* Use promise to return once database querying is complete. */
    return new Promise((resolve, reject) => {
      this.itemModel = new ItemModel(this.sequelize);
      this.instructionModel = new InstructionModel(this.sequelize);
      this.materialModel = new MaterialModel(this.sequelize);
      resolve();
    });
  }

  /**
  * @return {Promise} A promise of a database with foreignKey relationships.
  */
  setupRelations() {
    /* Use promise to return once database querying is complete. */
    return new Promise((resolve, reject) => {
      /* Make all events belong to some user. */
      this.instructionModel.Instruction.belongsTo(this.materialModel.Material, {
         foreignKey: {
           field: 'materialId',
           allowNull: false,
         },
         onDelete: 'CASCADE',
       });
       this.itemModel.Item.belongsTo(this.materialModel.Material, {
         foreignKey: {
           field: 'materialId',
           allowNull: false,
         },
         onDelete: 'CASCADE',
       });
      resolve();
    });
  }

  /** Cleanly close the database */
  close() {
    this.sequelize.close();
  }
}

module.exports = {Database};
