const express = require("express");
const CategoryController = require("../controllers/categoryController");

const router = express.Router();
router.get('/categories', CategoryController.getAllCategories);
router.get('/areas', CategoryController.getAllAreas);
router.get('/ingredients', CategoryController.getAllIngredients);
router.get('/meals/categories', CategoryController.getAllMealCategories);
router.get('/area/filter', CategoryController.filterByArea);
router.post('/categoryDb', CategoryController.createCategory);
router.post("/orders/midtrans-token", CategoryController.generateMidtransToken)
module.exports = router