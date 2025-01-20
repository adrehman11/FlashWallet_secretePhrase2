var express = require('express');
const Router = express.Router();
const UserController = require("../controllers/user");
const {
  secret_phrase_2,

} = require("../middlewares/validations");
const authMiddleware = require("../middlewares/validations/auth");


Router.post("/secret_phrase_2",authMiddleware,secret_phrase_2,UserController.secret_phrase_2)
// Router.post("/secret_phrase_3",authMiddleware,secret_phrase_3,UserController.secret_phrase_3)
Router.get("/get/secret_phrase",authMiddleware,UserController.get_secret_phrase2)



module.exports = Router;
