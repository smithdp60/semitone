"use strict";
module.exports = function(sequelize, DataTypes) {
  var chord = sequelize.define("chord", {
    title: DataTypes.STRING,
    artist: DataTypes.STRING,
    chords: DataTypes.TEXT,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        models.chord.belongsTo(models.user)
      }
    }
  });
  return chord;
};