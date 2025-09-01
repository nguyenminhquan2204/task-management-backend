import projectMemberServices from '../services/projectMemberServices';

let postCreateProjectMember = async (req, res) => {
   try {
      let data = await projectMemberServices.postCreateProjectMember(req.body);
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
   postCreateProjectMember
}