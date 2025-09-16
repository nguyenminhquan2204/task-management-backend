module.exports.requiredAuth = (req, res, next) => {
   const token = req.cookies?.token;
   if (!token) {
      return res.json({
         errorCode: 1,
         errorMessage: 'Plz login'
      });
   }
   const access_token = req.headers.authorization.split(' ')[1];
   console.log('aaaaaaa', token);
   next();
};
