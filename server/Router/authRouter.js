const express = require('express');
const authRouter = express.Router();
const { signup } = require("../Controller/authControler");

authRouter.post("/signup", signup);

module.exports = authRouter; // ✅ Direct export
