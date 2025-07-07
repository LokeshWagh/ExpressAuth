const mongoose = require('mongoose');
const Mongo_URL ="mongodb://localhost:27017/practiceDBConnect";

const dbconnection =()=>{
    mongoose
        .connect(Mongo_URL)
        .then((conn) => console.log(`Database Connected ${conn.connection.host}`))
        .catch("error")
}
module.exports= dbconnection;