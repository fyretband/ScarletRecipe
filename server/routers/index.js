const express = require("express");
const router = express.Router();
const recipeRouter = require('./recipe')
const categoryRouter = require('./category')
const userRouter = require('./user')
const facebookRouter = require('./facebook')
// const ingridientRouter = require('./ingredient')
const authentication = require('../middleware/authentication')

const RecipeController = require("../controllers/recipeController");
// const CategoryController = require("../controllers/categoryController");
const UserController = require("../controllers/userController");
// const IngredientController = require("../controllers/ingredientController");

router.use('/', userRouter )
router.use('/', categoryRouter)

router.use('/', recipeRouter)
router.use('/auth/facebook', facebookRouter)



module.exports = router