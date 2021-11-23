var nodemailer = require("nodemailer");
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.API_PORT || 3000;
app.use(cors());
const server = app.listen(port, () => console.log(`API Server listening on port ${port}`));
process.on('SIGINT', () => server.close());

var smtpTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "emailmoduledemo@gmail.com",
    pass: "wrjlpephrycezmbh",
  },
});

// var mailOptions = {
//   from: "emailmoduledemo@gmail.com",
//   to: "tharpra646@gmail.com",
//   subject: "Sending Email using Node.js",
//   text: "That was easy!",
// };

// transporter.sendMail(mailOptions, function (error, info) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Email sent: " + info.response);
//   }
// });

app.get('/email', (req, res) => {
    var from = "emailmoduledemo@gmail.com";
    var to = req.query.to;
    var subject = "Appointment Booking Successful";
    var docname = req.query.docname;
    var gmeetid = req.query.gmeetid;
    var meettime = req.query.meettime;
    var meetdate = req.query.meetdate;
    var generateTextFromHTML = true;
    //var html = req.query.html;
    //var html = "Your appointment is booked";
    var html = `Your appointment is successfully booked with ` + docname + ` Join the meet link ` + gmeetid + `at the time `+ meettime + ` on `+ meetdate ;

    const mailOptions = {
      from:from,
      to:to,
      subject:subject,
      generateTextFromHTML:generateTextFromHTML ,
      html:html
  };
    smtpTransport.sendMail(mailOptions, (error, response) => {
      error ? console.log(error) : console.log(response);
      smtpTransport.close();
  });
    res.send({
      msg: 'Your email was sent'
    });
  });
