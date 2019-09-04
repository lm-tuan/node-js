const express = require("express");
const router = express.Router();

const controllerUser = require('./../controllers/user.controller');
const middlewareLogin = require('./../middlewares/middleware.login');
const validateCreate = require('./../validate/validate.create')

const app = express();


router.get("/",middlewareLogin.middlewareLogin, controllerUser.index);

router.get("/search", controllerUser.searchUser);

router.get("/create", controllerUser.createUser);

router.get("/detail/:id", controllerUser.detailUser);

router.get("/edit/:id", controllerUser.editUser);

router.get("/delete/:id",controllerUser.deleteUser);

router.post("/create",validateCreate.validateCreate, controllerUser.createPost);

router.post("/update", controllerUser.UpdatePost);

module.exports = router;
