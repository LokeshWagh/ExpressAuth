const emailValidator = require("email-validator");
const userModel = require("../Model/userSchema");

const signup = async (req, res,next) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);

  // in this email validator is the must important field for usages

  // for validate the emeil we used the email validator
  const validateEmail = emailValidator.validate(email);

  if (!validateEmail) {
    return res.status(400).json({
      sussece: false,
      message: "Please Enter Valid Email",
    });
  }

  try {
    const userInfo = new userModel(req.body);
    console.log(userInfo)
    // hamare pass data direct aa raha hai par agar data name ka aa raha hai aur hame db me stored karne ke liye namee yesa chahihe to hame const userInfo=userModel.module({namee:name}); yese likhna padega

    // for save in the db

    const result = await userInfo.save();
    console.log(result);
    res.status(200).json({
      message: "Working perfectly",
      data: [],
    });
  } catch (e) {
    if (e.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Account is Already Exist",
      });
    } else {
      return res.status(400).json({
        success: false,
        message:e.message || "Not SignUp"
      });
    }
  }
};

//sign up functionality
const signin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Every field is filled",
    });
  }

  try {
    const result = await userModel.findOne({ email }).select("+password");
    if (!result) {
      return res.status(400).json({
        success: false,
        message: "Email is not Found",
      });
    }
    //agar passworng dale to kya karega
    if (result.password != password) {
      return res.status(401).json({
        success: false,
        message: "Password is incorrect",
      });
    }

  

    //Creating the JWT Token
    const token = result.jwtToken(); 
    result.password = undefined;

    const cookiesOption = {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true, 
       secure: "production"
    };

    res.cookie("token", token, cookiesOption);
    res.status(200).json({
      success: true,
      data: result,
    });


    //   return res.status(200).json({
    //   success: true,
    //   massage: "User Login SuccessFully",
    // });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


// for fetching the information of the user

const getuser =async(req,res)=>{
    const userID = req.user.id;
    console.log(userID);
    try {
      const userDetail= await userModel.findById(userID).select("+password");
      //console.log("UserDetail : ",userDetail.password.select("+password"));
      
      //console.log(userDetail.password)
      return res.status(200).json({
        success:true,
        data:userDetail
      })

    } catch (error) {
      return res.status(400).json({
        success:false,
        massage:"User Data Not get"
    })
    }
  }


  const logout =(req,res)=>{
    try {
      const cookiesOptional ={
        expires: new Date(),
        httpOnly:true
      }
      res.cookie("token",null,cookiesOptional);
      return res.status(200).json({
        success:true,
        message:"Logout SuccessFul"
      })
    } catch (error) {
      return res.status(400).json({
        success:false,
        message:"logout fail"
      })
    }
  }




module.exports = {
  signup,
  signin,
  getuser,
 logout
};
