'use strict';

import express from 'express'
import path from 'path'
import * as url from 'url';

// import addPostRoute from './api/add_posts.js'
// import clearPostRoute from './api/clear_posts.js'
import postRoute from './api/posts.js'
import mg from  './models/mongo-local.js'

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

// App Params
const app = express();
app.set("port", process.env.PORT || PORT)
app.set("host", process.env.HOST || PORT)
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

// app.use("/api/add_posts", addPostRoute);
// app.use("/api/clear_posts", clearPostRoute);
app.use("/api/posts", postRoute)

// Routes
app.get('/', function(req, res) {
  res.render("pages/index") 
});

app.get('/posts', function(req, res) {
  var response = {}
  response['status'] = null
  response['all_posts'] = mg.getallPosts()
  // var all_posts = mg.getallPosts()

  // res.render("pages/posts", {all_posts:all_posts});
  res.render("pages/posts", {response:response});
});

app.get('/add_posts', function(req, res) {
  res.render("pages/add_posts")
});

// Server
app.listen(app.get("port"), app.get("host"), () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});