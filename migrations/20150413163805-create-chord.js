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
      title: {
        type: DataTypes.STRING
      },
      artist: {
        type: DataTypes.STRING
      },
      chords: {
        type: DataTypes.TEXT
      },
      key: {
        type: DataTypes.INTEGER
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