import db from '../models/index';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

let hashPassword = (password) => {
   return new Promise(async (resolve, reject) => {
      try {
         let hash = await bcrypt.hashSync(password, salt);
         resolve(hash);
      } catch (error) {
         reject(error);
      }
   })
}

let checkInputValue = (data, inputType) => {
   let isValid = true;
   let element = '';

   for (let i = 0; i < inputType.length; i++) {
      if (!data[inputType[i]]) {
         isValid = false;
         element = inputType[i];
         break;
      }
   }

   return {
      isValid: isValid,
      element: element
   }
}

let postCreateUser = (data) => {
   return new Promise(async (resolve, reject) => {
      try {
         // console.log('data from service: ', data);
         let check = checkInputValue(data, ['userName', 'email', 'password', 'fullName', 'role']);
         // console.log('Check', check);
         if (!check.isValid) {
            resolve({
               errorCode: 1,
               errorMessage: `Missing parameter: ${check.element}`
            })
         } else {
            let emailExist = await db.User.findOne({
               where: {
                  email: data.email
               }
            });

            if (emailExist) {
               resolve({
                  errorCode: 2,
                  errorMessage: `Email already exists`
               })
            } else {
               // Hash password
               let hashedPassword = await hashPassword(data.password);
               // Create user
               let newUser = await db.User.create({
                  userName: data.userName,
                  email: data.email,
                  password: hashedPassword,
                  fullName: data.fullName,
                  role: data.role
               });

               resolve({
                  errorCode: 0,
                  errorMessage: `Create user successfully`,
                  user: newUser
               })
            }
         }
      } catch (error) {
         reject(error);
      }
   })
}

module.exports = {
   postCreateUser: postCreateUser,
}