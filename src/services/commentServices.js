import { Op } from 'sequelize';
import { checkIsValidInput } from '../helpers/checkIsValidInput';
import db from '../models/index';
import _, { reject } from 'lodash';

let postCreateComment = (data) => {
   return new Promise(async (resolve, reject) => {
      try {
         if(_.isEmpty(data)) {
            resolve({
               errorCode: 1,
               errorMessage: 'Missing data'
            })
         } else {
            let check = checkIsValidInput(data, ['taskId','userId','content']);
            if(!check.isValid) {
               resolve({
                  errorCode: 2,
                  errorMessage: `Missing parameter: ${check.element}`
               })
            } else {
               let checkComment = await db.comment.findOne({
                  where: {
                     [Op.and]: [
                        {userId: {[Op.eq]: data.userId}},
                        {content: {[Op.eq]: data.content}}
                     ]
                  }
               })
               if(checkComment) {
                  resolve({
                     errorCode: 3,
                     errorMessage: `Comment by userId exist. Plz a new comment`
                  })
               } else {
                  await db.comment.create({
                     taskId: data.taskId,
                     userId: data.userId,
                     content: data.content
                  })
                  resolve({
                     errorCode: 0,
                     errorMessage: 'Create comment by userId successfully!',
                  })
               }
            }
         }
      } catch (error) {
         reject(error);
      }
   })
}

let getAllComments = (query) => {
   return new Promise(async (resolve, reject) => {
      try {
         const {id} = query;
         let whereCondition = {};
         if(id) {
            whereCondition = {
               id: id
            }
         }
         let data = await db.comment.findAll({
            where: whereCondition
         })
         resolve({
            errorCode: 0,
            errorMessage: 'Get all comments or get with id',
            data: data
         })
      } catch (error) {
         reject(error);
      }
   })
}

let deleteCommentById = (query) => {
   return new Promise(async (resolve, reject) => {
      try {
         const { id } = query;
         if(!id) {
            resolve({
               errorCode: 1,
               errorMessage: 'Missing parameter'
            })
         } else {
            let checkCommentExist = await db.comment.findOne({
               where: {id: id}
            })
            if(!checkCommentExist) {
               resolve({
                  errorCode: 2, 
                  errorMessage: 'Comment is not found!'
               })
            } else {
               await checkCommentExist.destroy();
               resolve({
                  errorCode: 0,
                  errorMessage: 'Delete comment by id successfully!'
               })
            }
         }
      } catch (error) {
         reject(error);
      }
   })
}

module.exports = {
   postCreateComment,
   getAllComments,
   deleteCommentById
}