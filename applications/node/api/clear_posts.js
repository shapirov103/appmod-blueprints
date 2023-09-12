import express from 'express'
import mg from  '../models/mongo-local.js'

var router = express.Router();
 
router.get("/", function(req, res){

    
    var status = mg.clearPosts()

    console.log(status)

    var response = {}
    response['status'] = status
    response['all_posts'] = mg.getallPosts()

    res.render("pages/posts", {response:response});
});

export default router;