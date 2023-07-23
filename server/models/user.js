'use strict';
const bcrypt = require('bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Recipe, {
        foreignKey: 'userId',
        as: 'recipes'
      });
      User.hasMany(models.Donation)
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please provide a name'
          },
          notEmpty: {
            msg: 'Name field cannot be empty'
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: 'Please provide an email'
          },
          notEmpty: {
            msg: 'Email field cannot be empty'
          },
          isEmail: {
            msg: 'Please provide a valid email'
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please provide a password'
          },
          notEmpty: {
            msg: 'Password field cannot be empty'
          },
          len: {
            args: [6, 20],
            msg: 'Password must be between 6 and 20 characters'
          }
        }
      }
    },
    {
      sequelize,
      modelName: 'User',
      hooks: {
        beforeCreate(instance, options){
          console.log(instance, "beforecreate")
          let salt = bcrypt.genSaltSync(10)
          let hash = bcrypt.hashSync(instance.password, salt)
  
          instance.password = hash
        }
      }
    }
  );
  return User;
};