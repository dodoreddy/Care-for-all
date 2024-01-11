const express = require('express')
const path = require("path")
var nodemailer = require('nodemailer');
const fs = require('fs');
const { text } = require('body-parser');
require('dotenv').config()

const app = express()
const port = 5000


app.set('view engine', 'ejs')
app.use("*/styles", express.static(path.join(__dirname, "styles")));
app.use("*/files", express.static(path.join(__dirname, "static")));
app.use("*/scripts", express.static(path.join(__dirname, "scripts")));

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// !debug
// app.use((req, res, next) => {
// 	console.log(req.url);
// 	next();
// });


//Gets number of caresel files
const pathToDirectory = './static/img carasoul';
var number_of_images_in_carasel = 4

fs.readdir(pathToDirectory, (error, files) => {
  if (error) {
    console.log(error);
  } else {
    number_of_images_in_carasel = files.length
  }
});


app.get('/', (req, res) => {
  res.render('index.ejs', {images: number_of_images_in_carasel})
})

app.get('/volunteer', (req, res) => {
  res.render('volunteer.ejs')
})

app.get('/fundraise', (req, res) => {
  res.render('fundraise.ejs')
})

app.get('/donate', (req, res) => {
  res.redirect('https://www.ketto.org/fundraiser/providing-healthcare-and-awareness-to-1000-underprivileged-children?utm_medium=copy&utm_content=d6ae5353cc5b9b9003e5d7f6c894b895&shby=1&utm_source=external_Ketto&utm_campaign=providing-healthcare-and-awareness-to-1000-underprivileged-children')
})

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL,
    pass: process.env.GMAIL_PWD
  }
});

app.post('/contact', (req, res) => {
  msg_to_send = "Feedback from " + req.body.name + " with email " + req.body.email
  msg_to_send = msg_to_send + "\n\n" + req.body.msg

  var mailOptions = {
    from: process.env.GMAIL,
    to: 'careforall1000plus@gmail.com',
    subject: 'Feedback from website',
    text: msg_to_send
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      console.log("ssdihdss")
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  res.sendStatus(200)
})

app.use((req, res) => {
  res.status(404)
  res.render("pagenotfound.ejs")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  console.log(`http://localhost:${port}`)
})