package main

import (
	"net/http"
	"github.com/gin-gonic/gin"
)

type blogpost struct {
	Title 	string 	`json:"title"`
	Content string 	`json:"content"`
}

var blogposts = []blogpost {
	{Title: "First Post", Content: "This is the first blogpost!"},
	{Title: "Second Post", Content: "This is my next blogpost where I talk about my travel adventures!"},
	{Title: "Third Post", Content: "Today is a happy day!"},
	{Title: "Fourth Post", Content: "The weather today is really nice to walk around."},
}

func getBlogposts(context *gin.Context) {
	context.IndentedJSON(http.StatusOK, blogposts)
}

func addBlogpost(context *gin.Context) {
	var newBlogpost blogpost

	if err := context.BindJSON(&newBlogpost); err != nil { return }

	blogposts = append(blogposts, newBlogpost)
	context.IndentedJSON(http.StatusCreated, newBlogpost)
}

func main() {
	router := gin.Default()

	// Serve the HTML page at the root URL
	router.LoadHTMLGlob("templates/*") // Make sure your HTML file is in a "templates" folder
	router.GET("/", func(context *gin.Context) {
		context.HTML(http.StatusOK, "index.html", nil)
	})

	router.GET("/api/blogposts", getBlogposts)
	router.POST("/api/addblogpost", addBlogpost)
	router.Run("localhost:9090")
}