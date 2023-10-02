# Use the official Golang image as the base image
FROM golang:latest

# Set the working directory inside the container
WORKDIR /app

# Copy the Go source code into the container
COPY . .

# Copy the templates directory with the HTML file
COPY templates ./templates

ENV GOPROXY=https://goproxy.io

# Build the Go application
RUN go build -o main .

# Expose the port your API will run on
EXPOSE 9090

# Command to run the executable
CMD ["go", "run", "main.go"]