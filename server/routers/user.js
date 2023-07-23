const express = require("express");
const UserController = require("../controllers/userController");
// const Authorization = require("../middleware/authorization");
const authentication = require("../middleware/authentication");


const router = express.Router();

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/donation',authentication, UserController.donation)


module.exports = router