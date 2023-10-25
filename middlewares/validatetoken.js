// const asyncHandler = require("express-async-handler");
// const jwt = require("jsonwebtoken")

// SECRET_KEY="akshar"

// const validateToken = asyncHandler(async (req,res,next)=>{
//     const auth = req.headers.authorization;
//     let token
//     console.log("validatetoken"+" "+auth);

//     if(auth && auth.startsWith("Bearer")){
//         token = auth.split(" ")[1];
//         jwt.verify(token,SECRET_KEY,(err,decoded)=>{
//             if(err){
//                 console.log(err)
//                 res.status(401)
//                 throw new Error("user not authorized")
//             }
//             console.log("Authorized")
//             req.user = decoded.user
//             next()

//         })
//         if(!token){
//              res.status(401);
//              throw new Error("user not authorized");
//         }
//     }
//     console.log("done")
//     next();
// })
// module.exports = validateToken


const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "akshar";

const validateToken = asyncHandler(async (req, res, next) => {
  const auth = req.headers.authorization;
  let token;
  // console.log("validatetoken" + " " + req.headers.authorization);

  if (auth && auth.startsWith("Bearer")) {
    token = auth.split(" ")[1];
    console.log("validatetoken");
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        console.log(err);
        res.status(401);
        next(new Error("User not authorized")); 
      } else {
        console.log("Authorized");
        req.user = decoded.user;
        next();
      }
    });
  } else {
    console.log("Token not found");
    res.status(401);
    next(new Error("User not authorized"));
  }
});

module.exports = validateToken;
