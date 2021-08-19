const nodemailer = require('nodemailer');
const config = require('../config/config');

module.exports = {
  sendMail: (recipient, subject, content, attachments, cb) => {
    var transporter = nodemailer.createTransport({
      service: config.mailer.service,
      auth: {
        user: config.mailer.sender,
        pass: config.mailer.password,
      },
    });

    var mailOptions = {
      from: config.mailer.sender,
      to: recipient,
      subject,
      html: content,
      attachments: attachments,
    };

    return transporter.sendMail(mailOptions, cb);
  },
};
