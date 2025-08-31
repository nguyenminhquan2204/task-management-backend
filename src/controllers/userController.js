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

let putEditUser = async (req, res) => {
   try {
      let data = await userServices.putEditUser(req.body);
      return res.status(200).json(data);
   } catch (error) {
      console.log(error);
      return res.status(200).json({
         errorCode: -1,
         errorMessage: 'Error from the server! Contact Nguyen Quan'
      })
   }
}

let getAllUsers = async (req, res) => {
   try {
      let data = await userServices.getAllUsers();

      return res.status(200).json(data);
   } catch (error) {
      console.log(error);
      return res.status(200).json({
         errorCode: -1,
         errorMessage: 'Error from the server! Contact Nguyen Quan'
      })
   }
}

let getUserById = async(req, res) => {
   try {
      let data = await userServices.getUserById(req.query.id);
      return res.status(200).json(data);
   } catch (error) {
      console.log(error);
      return res.status(200).json({
         errorCode: -1,
         errorMessage: 'Error from the server! Contact Nguyen Quan'
      })
   }
}

let deleteUser = async (req, res) => {
   try {
      let data = await userServices.deleteUser(req.query.id);
      return res.status(200).json(data);
   } catch (error) {
      console.log(error);
      return res.status(200).json({
         errorCode: -1,
         errorMessage: 'Error from the server! Contact Nguyen Quan'
      })
   }
}

let postLogin = async (req, res) => {
   try {
      let data = await userServices.postLogin(req.body);

      return res.status(200).json(data);
   } catch (error) {
      console.log(error);
      return res.status(200).json({
         errorCode: -1,
         errorMessage: 'Error from the server! Contact Nguyen Quan'
      })
   }
}

let postForgotPassword = async (req, res) => {
   try {
      let data = await userServices.postForgotPassword(req.body);
      return res.status(200).json(data);
   } catch (error) {
      console.log(error);
      return res.status(200).json({
         errorCode: -1,
         errorMessage: 'Error from the server! Contact Nguyen Quan'
      })
   }
}

let postVerifyForgotPassword = async (req, res) => {
   try {
      let data = await userServices.postVerifyForgotPassword(req.body);
      return res.status(200).json(data);
   } catch (error) {
      console.log(error);
      return res.status(200).json({
         errorCode: -1,
         errorMessage: 'Error from server! Contact Nguyen Quan'
      })
   }
}

let getSearchUsersByUserName = async (req, res) => {
   try {
      let data = await userServices.getSearchUsersByUserName(req.query.name);
      return res.status(200).json(data);
   } catch (error) {
      console.log(error);
      return res.status(200).json({
         errorCode: -1,
         errorMessage: 'Error from server! Contact Nguyen Quan'
      })
   }
}

module.exports = {
   postCreateUser: postCreateUser,
   putEditUser: putEditUser,
   getAllUsers: getAllUsers,
   getUserById: getUserById,
   deleteUser: deleteUser,
   postLogin: postLogin,
   postForgotPassword: postForgotPassword,
   postVerifyForgotPassword: postVerifyForgotPassword,
   getSearchUsersByUserName: getSearchUsersByUserName,

} 