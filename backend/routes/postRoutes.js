const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// GET all posts
router.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find({});
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching posts', error: error.message });
    }
});

// GET specific post by ID
router.get('/posts/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching post', error: error.message });
    }
});

// POST create a new post
router.post('/posts', async (req, res) => {
    try {
        const { title, content } = req.body;

        // Validate title
        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }
        
        // Validate content
        if (!content) {
            return res.status(400).json({ message: 'Content is required' });
        }

        // Additional validation logic (e.g., length check)
        if (title.length < 5) {
            return res.status(400).json({ message: 'Title must be at least 5 characters long' });
        }

        if (content.length < 10) {
            return res.status(400).json({ message: 'Content must be at least 10 characters long' });
        }

        // Create new post
        const newPost = await new Post({ title, content });
        await newPost.save();

        // Return the created post with a success message
        return res.status(201).json({ message: 'Post created successfully', post: newPost });

    } catch (error) {
        // Catch and return unexpected server errors
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
});


// PUT update a post by ID
router.put('/posts/:id', async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(400).json({ message: 'Error updating post', error: error.message });
    }
});

// DELETE a post by ID
router.delete('/posts/:id', async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        if (!deletedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({ message: 'Post deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting post', error: error.message });
    }
});

module.exports = router;
