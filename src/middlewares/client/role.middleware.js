module.exports.requireRole = (roles = []) => {
   return (req, res, next) => {
      if(!req.user) {
         return res.status(401).json({
            errorCode: 1,
            errorMessage: 'Plz login to system!'
         })
      }
      if(!roles.includes(req.user.role)) {
         return res.status(403).json({
            errorCode: 2,
            errorMessage: 'You not access to this function!'
         })
      }
      next();
   }
};
