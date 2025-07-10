const JWT= require('jsonwebtoken');
// next is very import because due to this if the function completely run then due to next there is next function call which help in the route .... route pe detho yek route pe 2 method likhi hai yek validate karegi then next chalegi
const authJWT = (req,res,next) =>{
     const token = (req.cookies && req.cookies.token) || null;
     //console.log("Cookie token:", req.cookies?.token);

     if(!token) {
        return res.status(400).json({
            success:false,
            message:'Token not exist'
        })
     }

     try {
          const payload =JWT.verify(token ,"5875898545" );
          //console.log(payload)
          req.user ={id:payload.id,email:payload.email};
          //console.log(req.user)
          next();
        
     } catch (error) {
        return res.status(400).json({
            success:false,
            message:"Something Went Wrong"

        })
     }

   
}
module.exports=authJWT;