const mongoose = require("mongoose");
const JWT= require("jsonwebtoken");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is Required"],
        minLength: 2,
        trim:true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase:true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    }
}, {
    timestamps: true
});

// // 🔍 .methods kya hai?
// .methods Mongoose ka built-in object hai, jisme tum custom functions define kar sakte ho jo har document (i.e., user) ke sath kaam karein.

// 📌 Kyu use karte hain?
// Agar tum ek user object pe koi kaam repeatedly karte ho (e.g., password check, token generate, full name return), to us logic ko .methods me define kar dete hain.
 userSchema.methods={
    jwtToken(){
       return JWT.sign(
        {id: this._id,email:this.email},
        "5875898545",
        {expiresIn:"24h"}
       )
    }
 }




const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
