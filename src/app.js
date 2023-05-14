const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');



const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//Global Variable
const posts = [{story:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit aliquam etiam erat velit scelerisque in dictum non. Semper eget duis at tellus at urna condimentum mattis pellentesque. Purus viverra accumsan in nisl nisi scelerisque eu. Aliquam sem fringilla ut morbi tincidunt augue interdum velit. Sed id semper risus in hendrerit. Eu augue ut lectus arcu bibendum at varius vel pharetra. Sit amet nisl purus in mollis. Ultrices in iaculis nunc sed augue lacus viverra. Vulputate dignissim suspendisse in est ante in nibh.Feugiat in ante metus dictum at tempor commodo ullamcorper a. Donec ac odio tempor orci dapibus ultrices in iaculis nunc. Viverra justo nec ultrices dui sapien eget mi proin sed. Eu sem integer vitae justo eget magna fermentum. Magna etiam tempor orci eu lobortis elementum. Nunc vel risus commodo viverra maecenas. Et netus et malesuada fames ac turpis egestas integer. Curabitur vitae nunc sed velit dignissim. At quis risus sed vulputate odio ut. Eget nullam non nisi est sit amet facilisis magna. Eget egestas purus viverra accumsan in nisl nisi scelerisque eu. Morbi tristique senectus et netus et.",title:"Sample Day"}];

app.get("/healthz", (req,res) => {
    res.send("OK");
})

app.get('/', (req, res) => {
  res.render('home', {
    StartingContent: homeStartingContent,
    posts: posts,
  })
})

app.get('/posts/:day', (req, res) => {

  const requestedTitle = _.lowerCase(req.params.day);

  for (let i = 0; i < posts.length; i++) {
    let storedTitle = _.lowerCase(posts[i].title);

    if (storedTitle === requestedTitle) {
      res.render('post', { Title: posts[i].title, Content: posts[i].story })
    }
  }

})

app.get('/about', (req, res) => {
  res.render('about', { aboutContents: aboutContent })
})

app.get('/contact', (req, res) => {
  res.render('contact', { contactContents: contactContent })
})

app.get('/compose', (req, res) => {
  res.render('compose')
})

app.post('/compose', (req, res) => {

  let publish = {
    story: req.body.compose,
    title: req.body.title
  };
  posts.push(publish);

  res.redirect("/")

})



app.listen(process.env.PORT || 3000, function () {
  console.log("Server started");
});
