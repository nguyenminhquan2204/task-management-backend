import db from '../models/index';
import userServices from '../services/userServices';

let postCreateUser = async (req, res) => {
   try {
      let data = await userServices.postCreateUser(req.body);
      return res.status(200).json(data);
   } catch (error) {
      console.log(error);
      return res.status(200).json({
         errorCode: -1,
         errorMessage: 'Error from the server! Contact Nguyen Quan'
      })
   }
}

module.exports = {
   postCreateUser: postCreateUser,
}