const express = require("express");
const RecipeController = require("../controllers/recipeController");
const authentication = require('../middleware/authentication')
const router = express.Router();
router.get('/meals/search/:name', RecipeController.searchMeal);
router.get('/meals/find/:letter', RecipeController.searchMealsByFirstLetter);
router.get('/meals/filter', RecipeController.filterByMainIngredient);
router.get('/meals/category/:category', RecipeController.filterByCategory);

router.get('/meals/random', RecipeController.getRandomMeal);
router.use(authentication)
router.post('/recipeDb',RecipeController.createRecipe)
router.get('/recipe',RecipeController.findAllRecipe)
router.delete('/recipe/:id',RecipeController.deleteRecipe)
router.get(`/recipe/:id`,RecipeController.findRecipe)
router.put('/recipe/:id',RecipeController.updateRecipe)

module.exports = router;
