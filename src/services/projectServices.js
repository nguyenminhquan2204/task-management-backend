import { checkIsValidInput } from '../helpers/checkIsValidInput';
import db from '../models/index';
import _, { includes } from 'lodash';
import { Op, where } from 'sequelize';
import emailServices from './emailServices';

let postCreateProject = (data) => {
   return new Promise(async (resolve, reject) => {
      try {
         if (_.isEmpty(data)) {
            resolve({
               errorCode: 1,
               errorMessage: 'Missing project data'
            })
         } else {
            let check = checkIsValidInput(data, ['name', 'description', 'startDate', 'endDate', 'status','createdBy']);

            if (!check.isValid) {
               resolve({
                  errorCode: 2,
                  errorMessage: `Missing parameters: ${check.element}`
               })
            } else {
               let project = await db.Project.findOne({
                  where: {name: data.name}
               })

               if(project) {
                  resolve({
                     errorCode: 3,
                     errorMessage: 'Project name is already in use'
                  })
               } else {
                  await db.Project.create({
                     name: data.name,
                     description: data.description,
                     startDate: data.startDate,
                     endDate: data.endDate,
                     status: data.status,
                     createdBy: data.createdBy
                  })

                  resolve({
                     errorCode: 0,
                     errorMessage: 'Create project successfully'
                  })
               }
            }
         }
      } catch (error) {
         reject(error);
      }
   })
}

let putEditProject = (data) => {
   return new Promise(async (resolve, reject) => {
      try {
         if (_.isEmpty(data)) {
            resolve({
               errorCode: 1,
               errorMessage: 'Missing project data'
            })
         } else {
            let check = checkIsValidInput(data, ['id', 'name', 'description', 'startDate', 'endDate', 'status']);

            if (!check.isValid) {
               resolve({
                  errorCode: 2,
                  errorMessage: `Missing parameters: ${check.element}`
               })
            } else {
               let project = await db.Project.findOne({
                  where: {
                     id: data.id
                  }
               });

               if (!project) {
                  resolve({
                     errorCode: 3,
                     errorMessage: 'Project not found'
                  })
               } else {
                  project.name = data.name;
                  project.description = data.description;
                  project.startDate = data.startDate;
                  project.endDate = data.endDate;
                  project.status = data.status;

                  await project.save();

                  resolve({
                     errorCode: 0,
                     errorMessage: 'Update project successfully',
                     project: project
                  });
               }
            }
         }
      } catch (error) {
         reject(error);
      }
   })
}

let patchUpdateStatusProject = async (data) => {
   if (_.isEmpty(data)) {
      return {
         errorCode: 1,
         errorMessage: 'Missing project data'
      };
   }

   const check = checkIsValidInput(data, ['id', 'status']);
   if (!check.isValid) {
      return {
         errorCode: 2,
         errorMessage: `Missing parameters: ${check.element}`
      };
   }

   const project = await db.Project.findOne({
      where: { id: data.id }
   });

   if (!project) {
      return {
         errorCode: 3,
         errorMessage: 'Project not found'
      };
   }

   if (project.status === data.status) {
      return {
         errorCode: 4,
         errorMessage: 'New status must be different from old status!'
      };
   }

   project.status = data.status;
   await project.save();

   // Send email
   let users = await db.projectMember.findAll({
      where: {projectId: data.id},
      include: [
         {
            model: db.User,
            as: 'projectMemeberInfo',
            attributes: ['userName', 'fullName', 'email']
         }
      ]
   })
   let arrayUsers = users.map(user => {
      return {
         name: user.projectMemeberInfo.fullName,
         email: user.projectMemeberInfo.email
      }
   })
   // console.log(arrayUsers);
   await emailServices.sendEmailChangeStatusToUsers(project.name, arrayUsers, data.status);
   // End Send email

   return {
      errorCode: 0,
      errorMessage: 'Update project status successfully',
      project,
      users
   };
};


let getAllProjects = () => {
   return new Promise(async (resolve, reject) => {
      try {
         let data = await db.Project.findAll(
            {
               include: [
                  {
                     model: db.User,
                     as: 'creatorInfo',
                     attributes: ['userName', 'fullName', 'email', 'role']
                  }
               ]
            }
         );
         resolve({
            errorCode: 0,
            errorMessage: 'Get all projects successfully',
            projects: data
         });
      } catch (error) {
         reject(error);
      }
   })
}

let getProjectByIdOrCreatedBy = (data) => {
   return new Promise(async (resolve, reject) => {
      try {
         const { id, createdBy } = data || {};
         if (id && createdBy) {
            let project = await db.Project.findOne({
               where: {
                  id: id,
                  createdBy: createdBy
               },
               include: [
                  {
                     model: db.User,
                     as: 'creatorInfo',
                     attributes: ['userName', 'fullName', 'email', 'role']
                  }
               ]
            })
            if(!project) {
               resolve({
                  errorCode: 2,
                  errorMessage: "Project's include id and createdBy not exist. Plz inspect again!"
               })
            } else {
               resolve({
                  errorCode: 0,
                  errorMessage: 'Get project by id and createdBy successfully!',
                  project: project
               })
            }
         } else if(id){
            let project = await db.Project.findOne({
               where: {
                  id: id
               },
               include: [
                  {
                     model: db.User,
                     as: 'creatorInfo',
                     attributes: ['userName', 'fullName', 'email', 'role']
                  }
               ]
            });

            if (!project) {
               resolve({
                  errorCode: 2,
                  errorMessage: 'Project not found'
               })
            } else {
               resolve({
                  errorCode: 0,
                  errorMessage: 'Get project by id successfully',
                  project: project
               })
            }
         } else if(createdBy) {
            let projectByCreatedBy = await db.Project.findAll({
               where: { createdBy: createdBy },
               include: [
                  {
                     model: db.User,
                     as: 'creatorInfo',
                     attributes: ['userName', 'fullName', 'email', 'role']
                  }
               ]
            });
            if(!projectByCreatedBy) {
               resolve({
                  errorCode: 2,
                  errorMessage: 'CreatedBy is not exist ... !'
               })
            } else {
               resolve({
                  errorCode: 0,
                  errorMessage: 'Get All projects by createdBy successfully!',
                  projects: projectByCreatedBy
               })
            }
         } else {
            resolve({
               errorCode: 1,
               errorMessage: 'Missing parameter id or createdBy !'
            })
         }
      } catch (error) {
         reject(error);
      }
   })
}

let deleteProject = (id) => {
   return new Promise(async (resolve, reject) => {
      try {
         if (!id) {
            resolve({
               errorCode: 1,
               errorMessage: 'Missing project id'
            })
         } else {
            let project = await db.Project.findOne({
               where: {
                  id: id
               }
            })

            if (!project) {
               resolve({
                  errorCode: 2,
                  errorMessage: 'Project not found'
               })
            } else {
               await project.destroy();

               resolve({
                  errorCode: 0,
                  errorMessage: 'Delete project by id successfully'
               })
            }
         }
      } catch (error) {
         reject(error);
      }
   })
}

let getSearchProjectsByName = (query) => {
   return new Promise(async (resolve, reject) => {
      try {
         let {name, status} = query;
         let whereCondition = {};
         if(name && status) {
            whereCondition = {
               [Op.and]: [
                  {name: {[Op.like]: `%${name}%`}},
                  {status: {[Op.eq]: status}}
               ]
            }
         } else if(name) {
            whereCondition = {
               name: {[Op.like]: `%${name}%`}
            }
         } else if (status) {
            whereCondition = {
               status: {[Op.eq]: status}
            }
         } else {
            resolve({
               errorCode: 1,
               errorMessage: 'Missing parameter!'
            })
         }
         // find data
         let data = await db.Project.findAll({
            where: whereCondition,
            include: [
               {
                  model: db.User,
                  as: 'creatorInfo',
                  attributes: ['userName', 'fullName', 'email', 'role']
               }
            ]
         })

         resolve({
            errorCode: 0,
            errorMessage: 'Search by name and status successfully !',
            data: data
         })
      } catch (error) {
         reject(error);
      }
   })
}

module.exports = {
   postCreateProject: postCreateProject,
   putEditProject: putEditProject,
   patchUpdateStatusProject: patchUpdateStatusProject,
   getAllProjects: getAllProjects,
   getProjectByIdOrCreatedBy: getProjectByIdOrCreatedBy,
   deleteProject: deleteProject,
   getSearchProjectsByName: getSearchProjectsByName,

}