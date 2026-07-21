const express = require("express");
const isAdmin = require("../middleware/isAdmin");
const verifyToken = require("../middleware/VerifyToken");
const router = express.Router();
const Blog = require("../model/blog.model");
const Comment = require("../model/comment.model");

// Prove this exact file is the one being loaded
console.log(`[Bootstrap] blog.route loaded from: ${__filename}`);

// Router-level logger (fires for ANY request that reaches this router)
router.use((req, res, next) => {
  console.log(`[Router Log] ${req.method} ${req.originalUrl}`);
  next();
});

// Log param extraction specifically (fires whenever :id exists in the path)
router.param("id", (req, res, next, id) => {
  console.log(`[Param Log] :id param = ${id}`);
  next();
});

// ===== CREATE A BLOG POST =====
router.post("/create-post", verifyToken, isAdmin, async (req, res) => {
  console.log("[Route Log] /create-post route hit!");
  try {
    console.log("[Route Log] Request Body:", req.body);
    const newPost = new Blog({ ...req.body, author: req.userId});
    const savedPost = await newPost.save();
    console.log("[Route Log] Post created with ID:", savedPost._id);
    res.status(201).json({ message: "Post created successfully!", data: savedPost });
  } catch (error) {
    console.error("[Route Error] Error creating post:", error);
    res.status(500).send({ message: "Error creating post", error: error.message });
  }
});

// ===== GET ALL BLOGS =====
router.get("/", async (req, res) => {
  try {
    const { search, category, location } = req.query;
    console.log("[Route Log] / GET query:", { search, category, location });

    let query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } }
      ];
    }

    if (category) query.category = category;
    if (location) query.location = location;

    const posts = await Blog.find(query).populate('author', 'email').sort({ createdAt: -1 });
    res.status(200).send({ message: "All posts retrieved successfully", posts });
  } catch (error) {
    console.error("[Route Error] Error retrieving all posts:", error);
    res.status(500).send({ message: "Error retrieving all posts", error: error.message });
  }
});

// ===== GET SINGLE BLOG BY ID =====
router.get("/:id", async (req, res) => {
  try {
    console.log(`[Route Log] GET single post route hit for ID: ${req.params.id}`);

    const post = await Blog.findById(req.params.id);
    if (!post) {
      console.log("[Route Log] No post found for that ID");
      return res.status(404).json({ message: "Post not found" });
    }
    
    const comment = await Comment.find({postId: req.params.id}).populate('user', "username email")
    res.status(200).json({ message: "Single post retrieved successfully", post });
  } catch (error) {
    console.error("[Route Error] Error fetching single post:", error);
    res.status(500).json({ message: "Error fetching single post", error: error.message });
  }
});

// update a blog post
router.patch("/update-post/:id", verifyToken, async(req, res) => {
    try {
        const postId = req.params.id;
        const updatedPost = await Blog.findByIdAndUpdate(postId, {
            ...req.body
            
        }, {new: true});

        if(!updatedPost) {
            return res.status(404).send({ message: "Post not found"})
        }
        res.status(200).send({
            message: "Post updated successfully",
            post: updatedPost
        })
    } catch (error) {
        console.error("[Route Error] Error updating post:", error);
    res.status(500).send({ message: "Error updating post", error: error.message });
    }
})

// delete a blog post
router.delete("/:id", verifyToken, async(req, res) => {
    try {
        const postId = req.params.id;
        const post = await Blog.findByIdAndDelete(postId)
        if(!post) {
            return res.status(404).send({ message: "Post not found"})
        }

        // delete related comments
        await Comment.deleteMany({postId: postId})

        res.status(200).send({
            message: "Post deleted successfully",
            post: post
        })
    } catch (error) {
        console.error("[Route Error] Error deleting post:", error);
    res.status(500).send({ message: "Error deleting post", error: error.message });
    }
})

// related posts
router.get("/related/:id", async(req, res) => {
    try {
        const {id} = req.params;
        if(!id) {
            return res.status(400).send({ message: "Post id is required"})
        }

        const blog = await Blog.findById(id);

        if(!blog) {
            return res.status(404).send({ message: "Post is not found"})
        }
        const titleRegex = new RegExp(blog.title.split(' ').join('|'), 'i');

        const relatedQuery = {
            _id: {$ne: id}, // exclude the current blog by id
            title: {$regex: titleRegex}
        }

        const relatedPost  = await Blog.find(relatedQuery)
        res.status(200).send({message: "Related post found!", post: relatedPost})

    } catch (error) {
        console.error(" Error fetching related post:", error);
        res.status(500).send({ message: "Error fetching related post"})
    } 
})

module.exports = router;
