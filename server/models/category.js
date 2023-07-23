'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.belongsToMany(models.Recipe, {
        through: 'RecipeCategory', // Name of the join table
        foreignKey: 'categoryId',
        otherKey: 'recipeId',
        as: 'recipes'
      });
    }
  }
  Category.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Category name is required',
          },
          len: {
            args: [2, 50],
            msg: 'Category name must be between 2 and 50 characters',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Category',
    }
  );

  return Category;
};