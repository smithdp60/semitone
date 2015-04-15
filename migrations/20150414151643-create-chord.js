"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("chords", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      song: {
        type: DataTypes.STRING
      },
      chords: {
        type: DataTypes.TEXT
      },
      key: {
        type: DataTypes.INTEGER
      },
      youtube: {
        type: DataTypes.STRING
      },
      userId: {
        type: DataTypes.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    }).done(done);
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable("chords").done(done);
  }
};