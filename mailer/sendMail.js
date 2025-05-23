var nodemailer = require('nodemailer');
require('dotenv').config();
const {validation} = require('../utils/validation');

var transporter = nodemailer.createTransport({
  secure: true,
  host: process.env.SMTPHOST,
  port: process.env.SMTPPORT,
  auth: {
    user: process.env.SMTPUSER,
    pass: process.env.SMTPPW
  }
});

var mailOptions = {
  from: process.env.SMTPUSER,
  to: '',
  subject: 'Email From Node.js',
  // text: 'test mail easy!',
  html: ''
};

const sendMail = (userEmail) => {
  return new Promise((resolve, reject) => {
    const htmlTemplate = `
        <h4>Dear Raghunadh,</h4>
        <p>We have received the request from you for registering into the website of ABC.com.</p>
        <p>Thanks for showing interest to subscribe. To activate your email id to receive more information, please click below button.</p>
    
        <a href="http://localhost:3000/verify/search?search="${Buffer.from(userEmail).toString('base64')} class="rbl">Click Here for Activate</a>
    `;
    mailOptions.to = userEmail;
    mailOptions.html = htmlTemplate;
    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        let errors = {};
        errors.error = err.message;
        reject(validation(errors));
      } else {
        let sentTo = info.accepted[0];
        resolve(validation(sentTo));
      }
    });
  })
}

const testSend = (userEmail) => {
  console.log(userEmail);
}

module.exports = { sendMail, testSend };