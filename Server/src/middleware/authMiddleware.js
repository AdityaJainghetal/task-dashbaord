// const jwt = require("jsonwebtoken");

// const verifyToken = (req, res, next) => {
//   let token;
//   let authHeader = req.headers.Authorization || req.headers.authorization;
//   if (authHeader && authHeader.startsWith("Bearer")) {
//     token = authHeader.split(" ")[1];

//     if (!token) {
//       return res
//         .status(401)
//         .json({ message: "No token, authorizations denied" });
//     }

//     try {
//       const decode = jwt.verify(token, "Aditya");
//       req.user = decode;
//       console.log("The decoded user is: ", req, user);
//       next()
//     } catch (error) {
//       console.log(error);
//     }
//   }
// };

// module.exports = verifyToken;



const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    try {
      const decoded = jwt.verify(token, "Aditya");
      req.user = decoded;
      console.log("The decoded user is: ", req.user); // Fixed the typo here (was req, user)
      next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({ message: "Token is not valid" });
    }
  } else {
    return res.status(401).json({ message: "Authorization header missing or invalid" });
  }
};

module.exports = verifyToken;