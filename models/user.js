"use strict";

var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define("user", {
    name: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [2,50],
          msg: 'Please enter your name.'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Please enter a valid e-mail address.'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [6,100],
          msg: 'Password must be at least 6 characters long.'
        }
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        models.user.hasMany(models.chord)
      }
    },
    hooks: {
      beforeCreate: function(user,option,sendback) {
        bcrypt.hash(user.password,10,function(err,hash) {
          if (err) {throw err;}
          user.password = hash;
          sendback(null,user);
        })
      }
    }
  });
  return user;
};