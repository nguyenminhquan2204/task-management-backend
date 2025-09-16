module.exports.auth = (req, res, next) => {
   if (req?.headers?.authorization?.split(' ')[1]) {
      const token = req.headers.authorization.split(' ')[1];
      console.log('Check token', token);
      next();
   } else {
      // return exception
      return res.status(401).json({
         message: 'Ban chua truyen access_token o header/Hoac da bi het han'
      });
   }
}