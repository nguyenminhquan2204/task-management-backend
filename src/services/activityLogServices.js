import { Op, where } from 'sequelize';
import { checkIsValidInput } from '../helpers/checkIsValidInput';
import db from '../models/index';
import _, { includes } from 'lodash';

let postCreateActivityLog = (data) => {
   return new Promise(async (resolve, reject) => {
      try {
         if(_.isEmpty(data)) {
            resolve({
               errorCode: 1,
               errorMessage: 'Missing data'
            })
         } else {
            let check = checkIsValidInput(data, ['userId','action']);
            if(!check.isValid) {
               resolve({
                  errorCode: 2,
                  errorMessage: `Missing parameter: ${check.element}`
               })
            } else {
               let [newActivityLog, checkIsExist] = await db.activityLog.findOrCreate({
                  where: {
                     userId: data.userId,
                     action: data.action
                  },
                  defaults: {
                     userId: data.userId,
                     action: data.action
                  }
               })
               if(checkIsExist) {
                  resolve({
                     errorCode: 0,
                     errorMessage: 'Create activity log successfully!'
                  })
               } else {
                  resolve({
                     errorCode: 3,
                     errorMessage: 'Activity log is exist in database'
                  })
               }
            }
         }
      } catch (error) {
         reject(error);
      }
   })
}

let getAllActivityOrUserAction = (query) => {
   return new Promise(async (resolve, reject) => {
      try {
         const {userId, action} = query;
         let whereCondition = {};
         if(userId && action) {
            whereCondition = {
               [Op.and]: [
                  {userId: {[Op.eq]: userId}},
                  {action: {[Op.eq]: action}},
               ]
            }
         } else if(userId) {
            whereCondition = {
               userId: userId
            }
         } else if(action) {
            whereCondition = {
               action: action
            }
         }
         let data = await db.activityLog.findAll({
            where: whereCondition,
            include: [
               {
                  model: db.User,
                  as: 'userInfoActivityLog',
                  attributes: ['userName','email','fullName','role']
               }
            ]
         })
         resolve({
            errorCode: 0,
            errorMessage: 'Get all activity log',
            data: data
         })
      } catch (error) {
         reject(error);
      }
   })
}

module.exports = {
   postCreateActivityLog,
   getAllActivityOrUserAction,

}