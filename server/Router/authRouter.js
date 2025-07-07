const express = require('express');
const authRouter = express.Router();
const { signup, signin } = require("../Controller/authControler");

authRouter.post("/signup", signup);
authRouter.post("/signin",signin);
module.exports = authRouter; // ✅ Direct export
