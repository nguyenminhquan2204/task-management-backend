require('dotenv').config();
const nodemailer = require('nodemailer');

const sendEmailResetPassword = async (email, otp) => {
   // console.log('check', email, otp);
   let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
         user: process.env.EMAIL_APP,
         pass: process.env.EMAIL_APP_PASSWORD
      }
   });

   let info = await transporter.sendMail({
      from: ' "Nguyễn Minh Quân" <nguyenminhquantth@gmail.com>',
      to: email,
      subject: 'Lấy lại mật khẩu',
      html: getBodyHTMLEmail(otp)
   })
}

let getBodyHTMLEmail = (otp) => {
   let result = `
      <h1>Xin chào!</h1>
      <p>Mã OTP của bạn là: ${otp}</p>
   `;

   return result;
}

module.exports = {
   sendEmailResetPassword: sendEmailResetPassword
}