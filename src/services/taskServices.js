import { where, Op } from "sequelize";
import { checkIsValidInput } from "../helpers/checkIsValidInput";
import db from "../models/index";
import _, { assign, at, reject } from 'lodash';

let postCreateTask = (data) => {
   return new Promise(async (resolve, reject) => {
      try {
         if(_.isEmpty(data)) {
            resolve({
               errorCode: 1,
               errorMessage: 'Missing required data'
            })
         } else {
            let check = checkIsValidInput(data, ['projectId','assignedTo','title','description','status','priority','dueDate']);

            if(!check.isValid) {
               resolve({
                  errorCode: 2,
                  errorMessage: `Missing parameter: ${check.element}`
               })
            } else {
               let task = await db.Task.findOne({
                  where: {title: data.title, assignedTo: data.assignedTo}
               })
               if(task) {
                  resolve({
                     errorCode: 3,
                     errorMessage: 'Task already exists in users'
                  });
               } else {
                  let task = await db.Task.create({
                     projectId: data.projectId,
                     assignedTo: data.assignedTo,
                     title: data.title,
                     description: data.description,
                     status: data.status,
                     priority: data.priority,
                     dueDate: data.dueDate
                  });

                  resolve({
                     errorCode: 0,
                     errorMessage: 'OK',
                     data: task
                  });
               }
            }
         }
      } catch (error) {
         reject(error);  
      }
   })
}

let getAllTasks = () => {
   return new Promise(async (resolve, reject) => {
      try {
         let data = await db.Task.findAll(
            {
               include: [
                  { model: db.Project, as: 'projectData', attributes: ['name', 'description', 'status', 'startDate', 'endDate'] },
                  { model: db.User, as: 'userInfo', attributes: ['userName', 'email', 'fullName', 'role'] }
               ]
            }
         );
         resolve({
            errorCode: 0,
            errorMessage: 'OK',
            data: data
         });
      } catch (error) {
         reject(error);
      }
   })
}

let getTaskByIdOrAssigntedTo = (data) => {
   return new Promise(async (resolve, reject) => {
      try {
         const { id, assignedTo } = data || {}
         if(id && assignedTo) {
            let task = await db.Task.findOne({
               where: {
                  id: id,
                  assignedTo: assignedTo
               },
               include: [
                  { model: db.Project, as: 'projectData', attributes: ['name', 'description', 'status', 'startDate', 'endDate'] },
                  { model: db.User, as: 'userInfo', attributes: ['userName', 'email', 'fullName', 'role'] }
               ]
            })
            if(!task) {
               resolve({
                  errorCode: 2,
                  errorMessage: "Task is not exitst with id and assignedTo"
               })
            } else {
               resolve({
                  errorCode: 0,
                  errorMessage: 'Get task by id and assignTo successfully!',
                  task: task
               })
            }
         } else if(id) {
            let data = await db.Task.findOne({
               where: {id: id},
               include: [
                  { model: db.Project, as: 'projectData', attributes: ['name', 'description', 'status', 'startDate', 'endDate'] },
                  { model: db.User, as: 'userInfo', attributes: ['userName', 'email', 'fullName', 'role'] }
               ]
            });
            if(data) {
               resolve({
                  errorCode: 0,
                  errorMessage: 'OK',
                  data: data
               })
            } else {
               resolve({
                  errorCode: 2,
                  errorMessage: 'Task not found'
               })
            }
         } else if(assignedTo) {
            let tasks = await db.Task.findAll({
               where: { assignedTo: assignedTo },
               include: [
                  { model: db.Project, as: 'projectData', attributes: ['name', 'description', 'status', 'startDate', 'endDate'] },
                  { model: db.User, as: 'userInfo', attributes: ['userName', 'email', 'fullName', 'role'] }
               ]
            })
            if(!tasks) {
               resolve({
                  errorCode: 2,
                  errorMessage: 'Task is not exitst with assigntedTo'
               })
            } else {
               resolve({
                  errorCode: 0,
                  errorMessage: 'Get task by assigntedTo successfully!',
                  tasks: tasks
               })
            }
         } else {
            resolve({
               errorCode: 1,
               errorMessage: 'Missing parameter id or assignedTo'
            })
         }
      } catch (error) {
         reject(error);
      }
   })
}

let getAllTaskByProjectId = (projectId) => {
   return new Promise(async (resolve, reject) => {
      try {
         if(!projectId) {
            resolve({
               errorCode: 1,
               errorMessage: 'Missing required parameter'
            })
         } else {
            let data = await db.Task.findAll({
               where: {projectId: projectId},
               include: [
                  { model: db.User, as: 'userInfo', attributes: ['userName', 'email', 'fullName', 'role'] }
               ]
            });
            if(data) {
               resolve({
                  errorCode: 0,
                  errorMessage: 'OK',
                  data: data
               })
            } else {
               resolve({
                  errorCode: 2,
                  errorMessage: 'Task not found'
               })
            }
         }
      } catch (error) {
         reject(error);
      }
   })
}

let deleteTaskById = (id) => {
   return new Promise(async (resolve, reject) => {
      try {
         if(!id) {
            resolve({
               errorCode: 1,
               errorMessage: 'Missing parameter'
            })
         } else {
            let data = await db.Task.findOne(
               {
                  where: {id: id}
               }
            )
            if(data) {
               await data.destroy();
               resolve({
                  errorCode: 0,
                  errorMessage: 'Delete task by id successfully!'
               })
            } else {
               resolve({
                  errorCode: 2,
                  errorMessage: 'Invalid ID or id not exist!'
               })
            }
         }
      } catch (error) {
         reject(error);
      }
   })
}

let getSearchTaskByTitleStatus = (query) => {
   return new Promise(async (resolve, reject) => {
      try {
         const {title, status} = query;
         let whereCondition = {}
         if(title && status) {
            whereCondition = {
               [Op.and]: [
                  {title: {[Op.like]: `%${title}%`}},
                  {status: {[Op.eq]: status}}
               ]
            }
         } else if(title) {
            whereCondition = {
               title: {[Op.like]: `%${title}%`}
            }
         } else if(status) {
            whereCondition = {
               status: {[Op.eq]: status}
            }
         }

         let data = await db.Task.findAll({
            where: whereCondition,
            include: [
               { model: db.Project, as: 'projectData', attributes: ['name', 'description', 'status', 'startDate', 'endDate'] },
               { model: db.User, as: 'userInfo', attributes: ['userName', 'email', 'fullName', 'role'] }
            ]
         })
         resolve({
            errorCode: 0,
            errorMessage: 'Search successfully!',
            data: data
         })
      } catch (error) {
         reject(error);
      }
   })
}

let patchChangeStatusTaskById = (data) => {
   return new Promise(async (resolve, reject) => {
      try {
         if(_.isEmpty(data)) {
            resolve({
               errorCode: 1,
               errorMessage: 'Missing data'
            })
         } else {
            let check = checkIsValidInput(data, ['id']);
            if(!check.isValid) {
               resolve({
                  errorCode: 2,
                  errorMessage: `Missing parameter: ${check.element}`
               })
            } else {
               let task = await db.Task.findOne(
                  { 
                     where: {id: data.id},
                     include: [
                        { model: db.Project, as: 'projectData', attributes: ['name', 'description', 'status', 'startDate', 'endDate'] },
                        { model: db.User, as: 'userInfo', attributes: ['userName', 'email', 'fullName', 'role'] }
                     ]
                  }
               );
               if(!task) {
                  resolve({
                     errorCode: 3,
                     errorMessage: 'Task not found'
                  })
               } else {
                  if(data.status) {
                     task.status = data.status
                  }
                  if(data.priority) {
                     task.priority = data.priority;
                  }
                  await task.save();
                  resolve({
                     errorCode: 0,
                     errorMessage: 'Change progress task by id successfully!',
                     data: task
                  })
               }
            }
         }
      } catch (error) {
         reject(error);
      }
   })
}

module.exports = {
   postCreateTask,
   getAllTasks,
   getTaskByIdOrAssigntedTo,
   deleteTaskById,
   getSearchTaskByTitleStatus,
   patchChangeStatusTaskById,
   getAllTaskByProjectId
}
