const express = require("express");
const cookiesParser = require('cookie-parser')
const app = express();
const authRouter = require("./Router/authRouter");
const dbconnection= require("./Config/databaseConfig")

const PORT = process.env.PORT||5000;
app.use(express.json()); // dekh jo bhi data body se milega vo json ke form me hoga comform nahi isse type error ayegi kyu ki file ko json me data chahiye to isse kya hoga ki jo bhi data hoga vo convert hoga json me 
app.use(cookiesParser());


app.use("/api", authRouter);
dbconnection();
app.listen(PORT, () => {
    console.log(`It works on port${PORT} `);
});
