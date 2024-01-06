const express = require('express')
const path = require("path")
const app = express()
const port = 5000

const fs = require('fs')

app.set('view engine', 'ejs')
app.use("*/styles", express.static(path.join(__dirname, "styles")));
app.use("*/files", express.static(path.join(__dirname, "static")));
app.use("*/scripts", express.static(path.join(__dirname, "scripts")));

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
  res.render('donate.ejs')
})

app.get('/donate', (req, res) => {
  res.render('KETTO LINK')
})

app.use((req, res) => {
  res.status(404)
  res.render("pagenotfound.ejs")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  console.log(`http://localhost:${port}`)
})