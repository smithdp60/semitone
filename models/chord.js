"use strict";
module.exports = function(sequelize, DataTypes) {
  var chord = sequelize.define("chord", {
    song: DataTypes.STRING,
    chords: DataTypes.TEXT,
    key: DataTypes.INTEGER,
    youtube: DataTypes.STRING,
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