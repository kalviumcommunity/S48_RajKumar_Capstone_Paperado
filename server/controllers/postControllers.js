const Post = require("../model/Post");

// PUT: api/posts/:id (Update Post by ID)
const updatePost = async (req, res) => {
  const { id } = req.params; // Extract post ID from the route
  const { title, desc, photo, categories, username } = req.body; // Extract fields from the request body

  try {
    // Find the post by ID and update it
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { title, desc, photo, categories, username },
      { new: true, runValidators: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json({
      message: "Post updated successfully",
      post: updatedPost,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update post" });
  }
};

const createPost = async (req, res) => {
  const { title, desc, photo, categories, username } = req.body;

  try {
    const newPost = new Post({
      title,
      desc,
      photo,
      categories,
      username,
    });

    const savedPost = await newPost.save();

    res.status(201).json({
      message: "Post created successfully",
      post: savedPost,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create post" });
  }
};

module.exports = {
  createPost,
  updatePost,
};
