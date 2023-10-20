import express from 'express'
import bodyParser from 'body-parser'
import mg from  '../models/mongo-local.js'

var router = express.Router();
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post("/", urlencodedParser, function(req, res){
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

export default router;