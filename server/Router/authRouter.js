const express = require('express');
const authRouter = express.Router();
const { signup, signin,getuser,logout } = require("../Controller/authControler");
const authJWT =require("../MiddleWare/jwtAuth")

authRouter.post("/signup", signup);
authRouter.post("/signin",signin);
authRouter.get("/userinfo",authJWT,getuser);
authRouter.get("/logout",authJWT,logout);
module.exports = authRouter; 
