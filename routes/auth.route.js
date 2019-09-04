const express = require("express");


const authController = require('./../controllers/auth.controller');
const validateUser = require('./../validate/user.validate');
const router = express.Router();


router.get("/",authController.index);
router.get("/",authController.logout);

router.post("/",authController.loginPost);

module.exports = router;
