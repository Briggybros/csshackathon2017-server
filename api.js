const request = require('request');
const crypto = require('crypto');
const {Database} = require('./database/index.js');

const db = new Database();

/**
* Get the local authority based on the GPS coordinates
* @param {Number} latitude The users latitude
* @param {Number} longitude The users longitude
* @return {Object} An object containing the name of the county and the id.
*/
function getAuthority(latitude, longitude) {
  request(`http://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&sensor=false`, (error, response, body) => {
    if(!error && response.statusCode == 200) {
      let result = JSON.parse(body).results[0].address_components;
      let authority = null;
      for (let i = 0; i < result.length; i++) {
        for (let j = 0; j < result[i].types.length; j++) {
          if (result[i].types[j] === 'administrative_area_level_2') {
            authority = result[i].long_name;
          }
        }
      }
      if (authority !== null) {
        return {
          id: crypto.createHash('MD5').update(authority).digest('hex'),
          name: authority,
        };
      } else {
        return {error: 'cannot find local authority'};
      }
    }
  });
}

/**
* Get the item data from the barcode
* @param {String} barcode the items barcode
* @return {Array} an array of items this object is made up of.
*/
function getItems(barcode) {
  return new Promise((resolve, reject) => {
    resolve(db.itemModel.findAll({
      where: {
        barcode,
      },
    }).then((items) => {
      return items.map((item) => {
        return item.dataValues;
      });
    }));
  });
}

/**
* Get the material components of an item
* @param {String} item The item data
* @return {Object} An object containing the material data of the item.
*/
function getMaterial(item) {
  return new Promise((resolve, reject) => {
    resolve(db.materialModel.Material.findOne({
      where: {
        id: item.materialId,
      },
    }).then((material) => {
      return material.dataValues;
    }));
  });
}

function getInstruction(material, authority) {
  
}

/**
* Get the recycleable data for the components of an item
* @param {String} authority The ID of the authority
* @param {String} barcode The barcode of the item
* @return {Object} An object which describes the recycability of the components of the item.
*/
function getRecyclable(authority, barcode) {
  return getItems(barcode).then((items) => {
    let materials = items.map((item) => {
      return getMaterial(item).then((material) => {
        return {
          name: item.name,
          material: material,
        };
      });
    });

    return materials.map((material) => {
      return getInstruction(material, authority).then((instruction) => {
        return {
          name: material.name,
          instruction: instruction,
        };
      });
    });

    return
  });
}

module.exports = {getAuthority, getRecyclable};
