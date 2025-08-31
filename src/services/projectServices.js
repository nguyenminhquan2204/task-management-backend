import { checkIsValidInput } from '../helpers/checkIsValidInput';
import db from '../models/index';
import _ from 'lodash';
import { Op } from 'sequelize';

let postCreateProject = (data) => {
   return new Promise(async (resolve, reject) => {
      try {
         if (_.isEmpty(data)) {
            resolve({
               errorCode: 1,
               errorMessage: 'Missing project data'
            })
         } else {
            let check = checkIsValidInput(data, ['name', 'description', 'startDate', 'endDate', 'status']);

            if (!check.isValid) {
               resolve({
                  errorCode: 2,
                  errorMessage: `Missing parameters: ${check.element}`
               })
            } else {
               let newProject = await db.Project.create({
                  name: data.name,
                  description: data.description,
                  startDate: data.startDate,
                  endDate: data.endDate,
                  status: data.status
               });

               resolve({
                  errorCode: 0,
                  errorMessage: 'Create project successfully',
                  project: newProject
               });
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

let patchUpdateStatusProject = (data) => {
   return new Promise(async (resolve, reject) => {
      try {
         if (_.isEmpty(data)) {
            resolve({
               errorCode: 1,
               errorMessage: 'Missing project data'
            })
         } else {
            let check = checkIsValidInput(data, ['id', 'status']);

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
                  project.status = data.status;

                  await project.save();

                  resolve({
                     errorCode: 0,
                     errorMessage: 'Update project status successfully',
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

let getAllProjects = () => {
   return new Promise(async (resolve, reject) => {
      try {
         let data = await db.Project.findAll();
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

let getProjectById = (id) => {
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

let getSearchProjectsByName = (name) => {
   return new Promise(async (resolve, reject) => {
      try {
         if (!name) {
            let data = await db.Project.findAll();
            resolve({
               errorCode: 0,
               errorMessage: 'Get all projects successfully',
               projects: data
            });
         } else {
            let data = await db.Project.findAll({
               where: {
                  name: {
                     [Op.like]: `%${name}%`
                  }
               },
               query: true
            });
            resolve({
               errorCode: 0,
               errorMessage: 'Search projects by name successfully',
               projects: data
            });
         }
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
   getProjectById: getProjectById,
   deleteProject: deleteProject,
   getSearchProjectsByName: getSearchProjectsByName,

}