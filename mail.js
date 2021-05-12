const mailer = require("nodemailer");
const { Hello } = require("./hello_template");
const { Thanks } = require("./thanks_template");
const { ChatRoomInvite } = require("./chatRoomInvite_template");

const getEmailData = (to, name, template) => {
  let data = null;

  switch (template) {
    case "hello":
      data = {
        from: "John Ahn <jaewon@gmail.com>",
        to: to,
        subject: `Hello ${name}`,
        html: Hello(),
      };
      break;

    case "thanks":
      data = {
        from: "John Ahn <jaewon@gmail.com>",
        to: to,
        subject: `Hello ${name}`,
        html: Thanks(),
      };
      break;
    case "chatRoom":
      data = {
        from: "John Ahn <jaewon@gmail.com>",
        to: to,
        subject: `Chat room Invite for room ${name}`,
        html: ChatRoomInvite(name),
      };
    default:
      data;
  }
  return data;
};
//@SBA
const sendEmail = (to, name, type) => {
  const smtpTransport = mailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "frank77@ethereal.email",
      pass: "neZbZQNWwFW5tSYGc4",
    },
  });
  /*const smtpTransport = mailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "tyrel.cartwright@ethereal.email",
      pass: "jjChquu3qgKgUBBKPE",
    },
  });*/

  const mail = getEmailData(to, name, type);

  smtpTransport.sendMail(mail, function (error, response) {
    if (error) {
      console.log(error);
    } else {
      console.log(" email sent successfully");
    }
    smtpTransport.close();
  });
};

module.exports = { sendEmail };

/* const nodemailer = require('nodemailer');



const getEmailData = (title, body, timeAndDate, to, template) => {
    let data = null;

    switch (template) {
         case 'hello':
         data = {
             from: `Hello ${title}`,
             to,
             body: {body},
             time: {timeAndDate}
         }
         break;

         case "thanks":
             data = {
                 from: "John Ahn <jaewon@gmail.com>",
                 to,
                 body: `Hello ${body}`,
             }
             break;
         default:
             data;
     }
     return data;
}

const sendMail = (to, name, type) => {
   
   
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'princess89@ethereal.email',
            pass: 'mFmqdFcMb6dJDchDrW'
        }
    });

const mail = getEmailData(to, name, type)

transporter.sendMail(mail, function(error, response){
    if(error) {
        console.log(error)
    } else {
        console.log("Email sent")
    }
    transporter.close();

})

}

module.exports = { sendMail }
   */
