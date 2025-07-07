const express = require("express");
const app = express();
const authRouter = require("./Router/authRouter");

app.use(express.json()); 

app.use("/api", authRouter);

app.listen(5000, () => {
    console.log("It works on port 5000");
});
