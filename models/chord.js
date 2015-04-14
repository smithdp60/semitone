"use strict";
module.exports = function(sequelize, DataTypes) {
  var chord = sequelize.define("chord", {
    title: DataTypes.STRING,
    artist: DataTypes.STRING,
    chords: DataTypes.TEXT,
    key: DataTypes.INTEGER,
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