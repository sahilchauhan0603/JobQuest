import nodeMailer from "nodemailer";

export const sendEmail = async ({ email, subject, message }) => {
  const transporter = nodeMailer.createTransport({
    host: process.env.SMTP_HOST,
    service: process.env.SMTP_SERVICE,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const options = {
    from: process.env.SMTP_MAIL,
    to: email,  
    subject: subject,
    text: message,
  };

  await transporter.sendMail(options);
};

// nodemailer is a Node.js module that allows you to send emails easily from your server-side applications.
// In this file, nodemailer is used to create a transporter object with SMTP configuration (host, port, service, authentication).
// The sendEmail function uses this transporter to send emails with the specified recipient, subject, and message.
// This is useful for sending notifications, password resets, or any automated emails from your application.
