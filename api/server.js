// implement your server here
// require your posts router and connect it here
const express = require("express")
const server = express()

const postRoutes = require("./posts/posts-router")

server.use(express.json())
server.use(cors())

server.use("/api/posts", postRoutes)

module.exports = server;