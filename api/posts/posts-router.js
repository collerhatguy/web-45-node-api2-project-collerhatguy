// implement your posts router here
const express = require("express")
const router = express.Router()
const {
    find,
    findById,
    insert,
    update,
    remove,
    findPostComments,
    findCommentById,
    insertComment,
} = require("./posts-model");
const err = { message: "whoops" }

router.get("/api/posts", (req, res) => {
    find().then(posts => {
        res.status(200).json(posts)
    }).catch(() => {
        res.status(500).json(err)
    })
})

router.get("/api/posts/:id", (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json(err)
    findById(id).then(post => {
        post ?
            res.status(200).json(post)
            :
            res.status(404).json(post)

    }).catch(() => {
        res.status(500).json(err)
    })
})
