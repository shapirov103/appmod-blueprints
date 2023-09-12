import * as mongo from '../node_modules/mongo-local-db/build/mongo-local-db-1.1.3.js'

class MongoLocal {

    constructor (){
        console.log('mg constructor called'); // will print only once
        this.db = new mongo.DB()
        this.db.createCollection("posts")
    }

    printAllPost (){
        var cur = this.db.posts.find()
        console.log(cur.toArray())
    }

    getPostById (id) {

        var cur = this.db.posts.find({ $and: [{ _id : id}] })

        return cur.toArray()
    }

    getallPosts (){
        if (this.db.posts.count() > 0) {
            var cur = this.db.posts.find()
            return cur.toArray()
        }

        return null
    }

    addPost (item){
        var status = null

        if (this.db.posts.count() < 5) {
            this.db.posts.insert(item)
            status = "Blog Post Added"
        } else {
            status = "Max Blog Post Reached. Please clear posts to post new content"
        }

        this.printAllPost()

        return status
    }

    clearPosts (){
        var status = null

        this.db.posts.drop()
        if (this.db.posts.count() == 0) {
            status = "Blog Posts Cleared"
        }

        return status
    }
}

var mg = new MongoLocal(); // this is crucial, one instance is created and cached by Node


export default mg;
