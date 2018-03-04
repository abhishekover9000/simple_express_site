const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
// set config for app
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// app stuff
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// have app run on port
app.listen(3000);

// routes

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", function(req, res) {
  res.render("about");
});

app.get("/contact", function(req, res) {
  res.render("contact");
});

// to use this- make sure to go to - www.google.com/settings/security/lesssecureapps
app.post("/contact/send", function(req, res) {
  var transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "your@email.com",
      pass: "password"
    }
  });

  var mailOptions = {
    from: "Brad Traversy <techguyinfo@gmail.com>",
    to: "support@joomdigi.com",
    subject: "Website Submission",
    text:
      "You have a submission with the following details... Name: " +
      req.body.name +
      "Email: " +
      req.body.email +
      "Message: " +
      req.body.message,
    html:
      "<p>You have a submission with the following details...</p><ul><li>Name: " +
      req.body.name +
      "</li><li>Email: " +
      req.body.email +
      "</li><li>Message: " +
      req.body.message +
      "</li></ul>"
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
      res.redirect("/");
    } else {
      console.log("Message Sent: " + info.response);
      res.redirect("/");
    }
  });
});

console.log("server running on 3000");
