const models = require("../models");

module.exports = function(sequelize, DataTypes) {
  var friendships = sequelize.define("friendships", {
    uuid_1: {
      type: DataTypes.STRING,
      references: {
        model: "users",
        key: "id"
      }
    },
    uuid_2: {
      type: DataTypes.STRING,
      references: {
        model: "users",
        key: "id"
      }
    },
    status: {
      type: DataTypes.INTEGER
    }
  });
  return friendships;
};