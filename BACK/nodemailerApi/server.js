const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
const cors = require('cors')
require("dotenv").config();

app.use(express.json());
app.use(cors());

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL,
      pass: process.env.WORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
  });
  
  transporter.verify((err, success) => {
    err
      ? console.log(err)
      : console.log(`=== Server is ready to take messages: ${success} ===`);
  });
  
  app.post('/send', async function(req, res) {
    let mailOptions = {
      from: `${req.body.mailerState.email}`,
      to: process.env.EMAIL,
      subject: `Message from: ${req.body.mailerState.email}`,
      text: `${req.body.mailerState.message}`,
    };
  
    try {
      console.log(mailOptions);
      await transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
          res.json({
            status: "fail",
          });
        } else {
          console.log("== Message Sent ==");
          res.json({
            status: "success",
          });
        }
      });
    } catch (error) {
      console.error("Error sending email:", error);
      res.json({
        status: "fail",
      });
    }
  });
  

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
