var DataTypes = require("sequelize").DataTypes;
var _books = require("./books");

function initModels(sequelize) {
  var books = _books(sequelize, DataTypes);


  return {
    books,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
