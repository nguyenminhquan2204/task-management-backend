import projectServices from '../services/projectServices';

let postCreateProject = async (req, res) => {
   try {
      let data = await projectServices.postCreateProject(req.body);
      return res.status(200).json(data);
   } catch (error) {
      console.log(error);
      return res.status(200).json({
         errorCode: -1,
         errorMessage: 'Error from server! Contact Nguyen Quan'
      })
   }
}

let putEditProject = async (req, res) => {
   try {
      let data = await projectServices.putEditProject(req.body);
      return res.status(200).json(data);
   } catch (error) {
      console.log(error);
      return res.status(200).json({
         errorCode: -1,
         errorMessage: 'Error from server! Contact Nguyen Quan'
      })
   }
}

let patchUpdateStatusProject = async (req, res) => {
   try {
      let data = await projectServices.patchUpdateStatusProject(req.query);
      return res.status(200).json(data);
   } catch (error) {
      console.log(error);
      return res.status(200).json({
         errorCode: -1,
         errorMessage: 'Error from server! Contact Nguyen Quan'
      })
   }
}

let getAllProjects = async (req, res) => {
   try {
      let data = await projectServices.getAllProjects();
      return res.status(200).json(data);
   } catch (error) {
      console.log(error);
      return res.status(200).json({
         errorCode: -1,
         errorMessage: 'Error from server! Contact Nguyen Quan'
      })
   }
}

let getProjectById = async (req, res) => {
   try {
      let data = await projectServices.getProjectById(req.query.id);
      return res.status(200).json(data);
   } catch (error) {
      console.log(error);
      return res.status(200).json({
         errorCode: -1,
         errorMessage: 'Error from server! Contact Nguyen Quan'
      })
   }
}

let deleteProject = async (req, res) => {
   try {
      let data = await projectServices.deleteProject(req.query.id);
      return res.status(200).json(data);
   } catch (error) {
      console.log(error);
      return res.status(200).json({
         errorCode: -1,
         errorMessage: 'Error from server! Contact Nguyen Quan'
      })
   }
}

let getSearchProjectsByName = async (req, res) => {
   try {
      let data = await projectServices.getSearchProjectsByName(req.query);
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
   postCreateProject: postCreateProject,
   putEditProject: putEditProject,
   patchUpdateStatusProject: patchUpdateStatusProject,
   getAllProjects: getAllProjects,
   getProjectById: getProjectById,
   deleteProject: deleteProject,
   getSearchProjectsByName: getSearchProjectsByName,

}