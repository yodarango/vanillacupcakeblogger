const express = require("express");
const router = express.Router();

const Blog = require("../models/blog-model");
const Comment = require("../models/comments-model");
const Subscribers = require("../models/subscribers-model");
const Post = require("../models/post-models");
const User = require("../models/User-model");

router.get("/", async (req, res) => {
  const newBlog = {
    firstName: "Vanilla",
    secondName: "Blog",
    logo: "Logog",
    background: "Background",
    featuredTitle: `What is the Vanilla Blog?`,

    featuredContent: `The Vanilla Cupcake Blooger is a fully customizable blog for those who take blogging seriously. 
        Built with the best SEO practices, the greatest technologies and the the latest design petterns.`,
    featuredImage: `image`,
    profileImage: `profile Image`,
    aboutMyself: `<p>The Vanilla Cupcake Blooger is a fully customizable blog for those who take blogging seriously. 
        Built with the best SEO practices, the greatest technologies and the the latest design petterns. The Blog was programmed with the following concepts in mind:
        </p>
        
        
        
        <h3> 1 Steel-tough Security 🔒 </h3>
        <h3> 2 Top Google Ranking 📈 </h3>
        <h3> 3 Ease Of Use 🙌 </h3>
        <h3> 4 Light Speed Fast ⚡ </h3>
        <h3> 5 Elegant Style 🎨 </h3>
        
        <p>Only the latest and greates technologies were used to assure the best experience to your audience</p>`,
    contactInfo: `For more information Visit <a href = "http://www.xharcoal.com" >www.xharcoal.com<a/>`,
    categories: ["Chocolate Chips", "Ice Cream", "Candy"],
    latestYoutubeVideoShow: ``,
    youtubeShow: ``,
    youtubeUrl: `www.youtube.com`,
    instagramShow: ``,
    instagramUrl: `www.instagram.com`,
    facebookShow: ``,
    facebookUrl: `www.facebook.com`,
    twitterShow: ``,
    twitterUrl: `www.twitter.com`,
    pinterestShow: ``,
    pinterestUrl: `www.pinterest.com`,
    mediaFeedTitle: ``,
    mediaFeedEmbed: ``,
    paypalButton: ``,
    paypalButtonComment: ``,
    password: `abc123`,
    email: `myuser`,
    paypalButtonTitle: ``,
  };

  const newPost = {
    title: `What is the Vanilla Blog?`,
    content: `Bloggin had never been so easy and 🤩🧁 !! `,
    author: `Test`,
    postContent: `<p>The Vanilla Cupcake Blooger is a fully customizable blog for those who take blogging seriously. 
        Built with the best SEO practices, the greatest technologies and the the latest design petterns. The Blog was programmed with the following concepts in mind:
        </p>
        
        
        
        <h3> 1 Steel-tough Security 🔒 </h3>
        <h3> 2 Top Google Ranking 📈 </h3>
        <h3> 3 Ease Of Use 🙌 </h3>
        <h3> 4 Light Speed Fast ⚡ </h3>
        <h3> 5 Elegant Style 🎨 </h3>
        
        <p>Only the latest and greates technologies were used to assure the best experience to your audience</p>`,
    category: ["Candy"],
    created: Date.now(),
    postImage: "post image",
    date: Date.now(),
  };

  const newComments = {
    avatar: "images/avatars/Avatar7.png",
    name: "Jane Doe",
    comment: "Your blog is amazing! I have enjoyed it! ❤️",
    createdAt: Date.now(),
  };

  const newSubscriber = {
    name: "Jane Doe",
    email: "Janedoe@example.com",
    subscribedOn: Date.now(),
  };

  const newUser = {
    username: "myuser",
    password: "abc123",
  };

  try {
    await new Blog(newBlog).save();
    await new Post(newPost).save();
    await new Comment(newComments).save();
    await new Subscribers(newSubscriber).save();
    await new User(newUser).save();

    res.send("sucess!");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

