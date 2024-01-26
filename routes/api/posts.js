const express = require("express");
const router = express.Router();
const config = require("config");
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

const Profile = require("../../models/Profile");
const User = require("../../models/User");
const Post = require("../../models/Posts");
const { post } = require("request");

//---- POSTING ----
//@route         | POST api/Posts
// @description  | Create a post
// @access       | private (to make sure we wont be restricted since we dont need a token)
router.post(
  "/",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      //get user id
      const user = await User.findById(req.user.id).select("-password"); //not sending back password

      //new object for the new post
      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      //save this new post to a variable
      const post = await newPost.save();

      res.json(post); //show this post on a json
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//---- Getting Feed ----
//@route         | GET api/Posts
// @description  | Get all posts
// @access       | private | needs to have an account to view all posts
router.get("/", auth, async (req, res) => {
  try {
    //get the posts
    const posts = await Post.find().sort({ date: -1 }); //-1 makes the dates be earliest in front

    //return posts
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//---- Getting Feed by Id ----
//@route         | GET api/Posts:id
// @description  | getting singluar post
// @access       | private | needs to have an account to view all posts
router.get("/:id", auth, async (req, res) => {
  try {
    //get the posts
    const post = await Post.findById(req.params.id);

    //if id isnt found
    if (!post) {
      return res.status(404).json({ msg: "post not found" });
    }

    //return posts
    res.json(post);
  } catch (err) {
    console.error(err.message);

    //if id is incorrect
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "post not found" });
    }

    res.status(500).send("Server Error");
  }
});

//---- Deleting Feed ----
//@route         | DELETE api/Posts
// @description  | delete a post
// @access       | private | needs to have an account to view all posts
router.delete("/:id", auth, async (req, res) => {
  try {
    //get the post needing to be deleted
    const post = await Post.findById(req.params.id);

    // Check user to see if they are the correct person to delete the post
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    //if id isnt found
    if (!post) {
      return res.status(404).json({ msg: "post not found" });
    }

    //removing the post
    await post.deleteOne({ _id: req.user.id });

    //return message that post has been removed
    res.json({ msg: "post removed" });

    //ERROR HANDLING
  } catch (err) {
    console.error(err.message);

    //if id is incorrect
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "post not found" });
    }

    res.status(500).send("Server Error");
  }
});

//---- Adding likes ----
//@route         | PUT api/Posts/like/:id
// @description  | like a post
// @access       | private | needs to have an account to view all posts
router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //check if the post has alread been liked by the user
    if (
      post.likes
        //filter iterates through the likes to see if a post is alread liked by the user
        .filter((like) => like.user.toString() === req.user.id).length > 0
    ) {
      return res.status(400).json({ msg: "Post already liked" });
    }

    //adds the like to the post likes
    post.likes.unshift({ user: req.user.id });

    //saves this post
    await post.save();

    //shows the json on the posts likes
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//---- removing likes ----
//@route         | PUT api/Posts/unlike/:id
// @description  | like a post
// @access       | private | needs to have an account to view all posts
router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //check if the post has alread been liked by the user
    if (
      //if the length of the array is 0 it means the user hasnt liked the post
      post.likes
        //filter iterates through the likes to see if a post is alread liked by the user
        .filter((like) => like.user.toString() === req.user.id).length === 0
    ) {
      return res.status(400).json({ msg: "Post has not been liked" });
    }

    //Get remove index
    const removeIndex = post.likes
      //gets an array of the user ids that have liked the post
      .map((like) => like.user.toString())
      //finds the user match in the array and returns an index of that user id
      .indexOf(req.user.id);

    //take away the like from the post
    post.likes.splice(removeIndex, 1);

    //saves this post
    await post.save();

    //shows the json on the posts likes
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//---- Commenting ----
//@route         | POST api/Posts/comment/:id
// @description  | comment on a post
// @access       | private (to make sure we wont be restricted since we dont need a token)
router.post(
  "/comment/:id",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      //get user id
      const user = await User.findById(req.user.id).select("-password"); //not sending back password
      //getting post id
      const post = await Post.findById(req.params.id);

      //new object for the new comment
      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      post.comments.unshift(newComment);

      //save this new post to a variable
      await post.save();

      res.json(post.comments); //show this post on a json
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//---- deleting comment ----
//@route         | DELETE api/Posts/comment/:id/:comment_id
// @description  | delete a comment
// @access       | private (to make sure we wont be restricted since we dont need a token)
router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    //get the post that the comment is gonna be deleted on
    const post = await Post.findById(req.params.id);

    //get the comment needing to be deleted
    const comment = await post.comments
      //iterate through the comments on hte post and find the comment that matches the id on route
      .find((comment) => comment.id === req.params.comment_id);

    //if comment isnt found
    if (!comment) {
      return res.status(404).json({ msg: "comment not found" });
    }

    // Check user to see if they are the correct person to delete the comment
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    //Get remove index
    const removeIndex = post.comments
      //gets an array of the user ids that have liked the post
      .map((comment) => comment.user.toString())
      //finds the user match in the array and returns an index of that user id
      .indexOf(req.user.id);

    //take away the like from the post
    post.comments.splice(removeIndex, 1);

    //saves this post
    await post.save();

    //shows the json on the posts likes
    res.json(post.comments);

    //ERROR HANDLING
  } catch (err) {
    console.error(err.message);

    //if id is incorrect
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "post not found" });
    }

    res.status(500).send("Server Error");
  }
});

module.exports = router;
