// implement your posts router here
const express = require("express")
const router = express.Router()
const {
    find,
    findById,
    insert,
    update,
    remove,
    findPostComments
} = require("./posts-model");
const err = { message: "whoops" }

router.get("/api/posts", (req, res) => {
    find().then(posts => {
        res.status(200).json(posts)
    }).catch(() => {
        res.status(500).json({ message: "The posts information could not be retrieved" })
    })
})

router.get("/api/posts/:id", (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json(err)
    findById(id).then(post => {
        post ?
            res.status(200).json(post)
            :
            res.status(404).json({ message: "The post with the specified ID does not exist" })

    }).catch(() => {
        res.status(500).json({ message: "The post information could not be retrieved" })
    })
})

router.post("/api/posts", (req, res) => {
    const { body } = req;
    if (!body.title || !body.contents) return res.status(400).json({ message: "Please provide title and contents for the post" })
    insert(body).then(post => {
        res.status(201).json(post)
    }).catch(() => {
        res.status(500).json({ message: "There was an error while saving the post to the database" })
    })
}) 

router.put("/api/post/:id", (req, res) => {
    const { body, params: { id } } = req;
    if (!body.title || !body.contents || !id) return res.status(400).json({ message: "The post with the specified ID does not exist" })
    update(id, body).then(post => {
        post ?
            res.status(200).json(post)
            :
            res.status(404).json({ message: "The post with the specified ID does not exist" })

    }).catch(() => {
        res.status(500).json({ message: "The post information could not be modified" })
    })
})

router.delete("/api/post/:id", (req, res) => {
    const { id } = req.params;
    remove(id).then(post => {
        post ?
            res.status(200).json(post)
            :
            res.status(404).json({ message: "The post with the specified ID does not exist" })

    }).catch(() => {
        res.status(500).json({ message: "The post could not be removed" })
    })
})

router.get("/api/post/:id/comments", (req, res) => {
    const { id } = req.params;
    findPostComments(id).then(comments => {
        comments ?
            res.status(200).json(comments)
            :
            res.status(404).json({ message: "The post with the specified ID does not exist" })
    }).catch(() => {
        res.status(500).json({ message: "The comments information could not be retrieved" })
    })
})