const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");
const { protect, admin } = require("../middleware/auth");

router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find({ published: true }).populate("author", "name").sort({ createdAt: -1 }).limit(10);
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:slug", async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug }).populate("author", "name");
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", protect, admin, async (req, res) => {
  try {
    const blog = new Blog({ ...req.body, author: req.user._id });
    const saved = await blog.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/:id", protect, admin, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(blog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", protect, admin, async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
