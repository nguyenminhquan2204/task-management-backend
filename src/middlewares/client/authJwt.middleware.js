import jwt, { decoded } from 'jsonwebtoken';
require('dotenv').config();

module.exports.authJwt = (req, res, next) => {
   const authHeader = req?.headers?.authorization;
   if(!authHeader) {
      return res.status(401).json({
         errorCode: 1,
         errorMessage: 'Missing access_token. Plz check again!'
      })
   }
   const token = authHeader.split(' ')[1];
   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if(err) {
         return res.status(403).json({
            errorCode: 2,
            errorMessage: 'Token invalid or expired!. Plz check again!'
         })
      }
      req.user = decoded;
      next();
   })
}