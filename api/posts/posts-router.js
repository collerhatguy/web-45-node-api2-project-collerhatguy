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

router.get("/", (req, res) => {
    find().then(posts => {
        res.status(200).json(posts)
    }).catch(() => {
        res.status(500).json({ message: "The posts information could not be retrieved" })
    })
})

router.get("/:id", (req, res) => {
    const { id } = req.params;
    findById(id).then(post => {
        post ?
            res.status(200).json(post)
            :
            res.status(404).json({ message: "The post with the specified ID does not exist" })

    }).catch(() => {
        res.status(500).json({ message: "The post information could not be retrieved" })
    })
})

router.post("/", async (req, res) => {
    try {
        const { body } = req;
        if (!body.title || !body.contents) return res.status(400).json({ message: "Please provide title and contents for the post" })
        const postId = await insert(body)
        const justPosted = await findById(postId.id)
        res.status(201).json(justPosted)
    } catch {
        res.status(500).json({ message: "There was an error while saving the post to the database" })
    }
}) 

router.put("/:id", async (req, res) => {
    try {
        const { body, params: { id } } = req;
        if (!body.title || !body.contents) return res.status(400).json({ message: "Please provide title and contents for the post" })
        const post = await update(id, body)
        const updatedPost = await findById(id)
        post === 1 ?
            res.status(200).json(updatedPost)
            :
            res.status(404).json({ message: "The post with the specified ID does not exist" })
    } catch {
        res.status(500).json({ message: "The post information could not be modified" })
    }
})

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const toBeDeleted = await findById(id)
    remove(id).then(post => {
        post ?
            res.status(200).json(toBeDeleted)
            :
            res.status(404).json({ message: "The post with the specified ID does not exist" })

    }).catch(() => {
        res.status(500).json({ message: "The post could not be removed" })
    })
})

router.get("/:id/comments", (req, res) => {
    const { id } = req.params;
    findPostComments(id).then(comments => {
        comments.length > 0 ?
            res.status(200).json(comments)
            :
            res.status(404).json({ message: "The post with the specified ID does not exist" })
    }).catch(() => {
        res.status(500).json({ message: "The comments information could not be retrieved" })
    })
})

module.exports = router;