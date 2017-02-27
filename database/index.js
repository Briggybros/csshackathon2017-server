const Sequelize = require('sequelize');
const {AuthModel} = require('./models/AuthModel.js');
const {MaterialsModel} = require('./models/MaterialsModel.js');
const {ItemModel} = require('./models/ItemModel.js');

/** A class representing the database */
export class Database {


  /**
  * @constructor
  * @param {String} env The current environment.
  */
  constructor(env) {
    this.createSequelize(env)
      .then(() => {
        return this.createModels();
      })
      .then(() => {
        this.setupRelations().catch(console.log);
      });
  }

  /**
  * @param {String} env The current environment.
  * @return {Promise} A promise of a created database.
  */
  createSequelize(env) {
    /* Use promise to return once database querying is complete. */

      //
      // // /* Make all users have people they're following */
      // // this.followersModel.Follower.belongsTo(this.userModel.User, {
      // //   foreignKey: {
      // //     field: 'userId',
      // //     allowNull: false,
      // //   },
      // //   onDelete: 'CASCADE',
      // // });
      // /* Make all followers be following a user  */
      // this.userModel.User.hasMany(this.this.userModel.User
      //   // foreignKey: {
      //   //   field: 'followingId',
      //   //   allowNull: false,
      //   // },
      //   // onDelete: 'CASCADE',
      // );
      resolve();
    });
  }

  /** Cleanly close the database */
  close() {
    this.sequelize.close();
  }
}
