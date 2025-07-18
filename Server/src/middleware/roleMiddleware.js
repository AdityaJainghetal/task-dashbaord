// const authorizeRole = (...allowedRoles)=>{
//     return(req,res,next)=>{
//         if(!allowedRoles.includes(req,userModule.role)){
//             return res.status.json({message:"Access denied"})
//         }
//         next()
//     }
// }

// module.exports = authorizeRole

const authorizeRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};

module.exports = authorizeRole;
