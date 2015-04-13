"use strict";
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define("user", {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        models.user.hasMany(models.chord)
      }
    }
  });
  return user;
};