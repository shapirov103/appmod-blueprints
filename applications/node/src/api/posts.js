import express from 'express'
import bodyParser from 'body-parser'
import mg from  '../models/mongo-local.js'

var router = express.Router();
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post("/add_posts", urlencodedParser, function(req, res){

    var ts = Math.floor(Date.now() / 1000)

    var newPost = {
        email:req.body.email,
        title:req.body.title,
        content:req.body.content,
        timestamp: ts
    }
    
    var status = mg.addPost(newPost)

    var response = {}
    response['status'] = status
    response['all_posts'] = mg.getallPosts()

    res.render("pages/posts", {response:response});
});

router.get("/clear_posts", function(req, res){

    var status = mg.clearPosts()

    var response = {}
    response['status'] = status
    response['all_posts'] = mg.getallPosts()

    res.render("pages/posts", {response:response});
});

router.get("/:post_id", function(req,res){

    var post = mg.getPostById(req.params.post_id)

    var response = {}
    response['post'] = post[0]

    res.render("pages/full_post", {response:response});

});


export default router;