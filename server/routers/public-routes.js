//express & tools
const express = require('express');
const router = express.Router();
const format = require('date-fns/format');
const methodOverride = require('method-override');
const email = require('../sendgrid/sendgrid');

//middleware
router.use(express.json());
router.use(express.urlencoded({ extended: false }));
router.use(methodOverride('_method'));

const Post = require('../models/post-models');
const Blog = require('../models/blog-model');
const Subscriber = require('../models/subscribers-model');
const Comment = require('../models/comments-model');

const administrator = 'John Doe';
const ownerDomain = 'http://www.simplereflections.org';

////===============PUBLIC POSTS ROUTES=================
router.get('/see-post/:id', async (req, res) => {
	try {
		let post = await Post.findOne({ _id: req.params.id });
		let blog = await Blog.findOne({});

		// if (posts == undefined || posts.length == 0) { posts = defaults.defaultPosts}
		// if (blog == undefined || blog.length == 0 ) { blog = defaults.defaultBlog }

		res.render('see-post', { blog, post });
	} catch (error) {
		res.status(401).render('error', { error: error });
	}
});

router.get('/posts', async (req, res) => {
	let more;
	Number.isNaN(parseInt(req.query.skip))
		? (more = 10)
		: (more = parseInt(req.query.skip) + 10);
	try {
		let count = await Post.find().countDocuments({});
		let blog = await Blog.findOne({});
		let posts = await Post.find({})
			.sort({ date: -1 })
			.limit(10)
			.skip(parseInt(req.query.skip))
			.exec();

		// if (count == undefined || count.length == 0) { count = 1}
		// if (posts == undefined || posts.length == 0) { posts = defaults.defaultPosts}
		// if (blog == undefined || blog.length == 0 ) { blog = defaults.defaultBlog }

		res.render('all-posts', { posts, blog, count, more, less: more - 20 });
	} catch (error) {
		res.render('error', { error: error });
	}
});

router.post('/posts', async (req, res) => {
	const param = req.body.filter === undefined ? '' : req.body.filter;
	const regex = new RegExp(`${param}`);

	try {
		const count = await Post.find().countDocuments({});
		const posts = await Post.find({ postContent: regex })
			.sort({ date: -1 })
			.exec();
		const blog = await Blog.findOne({});

		res.render('all-posts', { blog, posts, count, more: '', less: '' });
	} catch (error) {
		res.status(401).render('error', { error: error });
	}
});

router.post('/comments', async (req, res) => {
	const html = `<div data-role="module-unsubscribe" class="module" role="module" data-type="unsubscribe" style="color:#444444; font-size:12px; line-height:20px; padding:16px 16px 16px 16px; text-align:Center;" data-muid="4e838cf3-9892-4a6d-94d6-170e474d21e5">
    <img src="http://cdn.mcauto-images-production.sendgrid.net/5da8ea5c103c0a36/3c40c3f0-e64c-4eac-8a09-2f40383550a5/500x500.jpeg" style="width: 50%; ">
    
    <p style="font:20px Arial; line-height:36px;">
   Good news, ${administrator}!! ${req.body.name}! has commented on your blog: <br> ${req.body.comment}

      <a href="${ownerDomain}/#avatar-comment" target="_blank" class="Unsubscribe--unsubscribePreferences" style="font: 800 1.3rem sans-serif;text-decoration:none; color: white; padding: 1rem 1.5rem; background-color: #119822; display: block; width: 80%; margin: 3rem auto; max-width: 500px;">
    See it Live!
      </a>
    </p>
  </div>`;
	const subject = 'Someone just commented on your blog!';

	email.newCommentContactEmail(subject, html);

	const newDate = format(new Date(), 'MM/dd/yyyy h:mm');
	const comment = new Comment({ ...req.body, createdAt: newDate });

	try {
		await comment.save();
		res.redirect('/#public-comments-anchor');
	} catch (error) {
		res.status(401).render('error', { error: error });
	}
});

router.get('/about', async (req, res) => {
	try {
		let postCount = await Post.find({}).countDocuments({});
		let count = await Subscriber.find({}).countDocuments({});
		let blog = await Blog.findOne({});
		let commentCount = await Comment.find({}).countDocuments({});

		// if (postCount == undefined || postCount.length == 0) { postCount = 1}
		// if (posts == undefined || posts.length == 0) { posts = defaults.defaultPosts}
		// if (blog == undefined || blog.length == 0 ) { blog = defaults.defaultBlog }

		res.render('about', { blog, count, postCount, commentCount });
	} catch (error) {
		res.status(401).render('error', { error: errors });
	}
});

router.post('/subscribers', async (req, res) => {
	const html = `<div data-role="module-unsubscribe" class="module" role="module" data-type="unsubscribe" style="color:#444444; font-size:12px; line-height:20px; padding:16px 16px 16px 16px; text-align:Center;" data-muid="4e838cf3-9892-4a6d-94d6-170e474d21e5">
    <img src="http://cdn.mcauto-images-production.sendgrid.net/5da8ea5c103c0a36/3c40c3f0-e64c-4eac-8a09-2f40383550a5/500x500.jpeg" style="width: 50%; ">
    
    <p style="font:20px Arial; line-height:36px;">
   Thank you, ${req.body.name}! <br> You have been subscribed to the ${ownerDomain} Blog and will start receiving updates from now on 😃!!!

      <a href="http://savvysaute.com/posts" target="_blank" class="Unsubscribe--unsubscribePreferences" style="font: 800 1.3rem sans-serif;text-decoration:none; color: white; padding: 1rem 1.5rem; background-color: #119822; display: block; width: 80%; margin: 3rem auto; max-width: 500px;">
    Start Exploring Posts
      </a>
    </p>
  </div>`;
	const subject = 'Thank you for subscribing!';
	const recepient = req.body.email;

	email.subscriberEmail(recepient, subject, html);

	const subscribredOn = format(new Date(), 'MM/dd/yyyy h:mm');
	const subscriber = new Subscriber({
		...req.body,
		subscribedOn: subscribredOn,
	});
	try {
		let blog = await Blog.findOne({});

		// if (blog == undefined || blog.length == 0 ) { blog = defaults.defaultBlog }

		await subscriber.save();
		res.status(200).render('success-message', {
			message: `<h1 class="success-error-message">YOU HAVE BEEN SUBSCRIBED! ✅ </h1>
        <p class="success-error-message">Thank you, <span>${req.body.name}</span> you will now receive updates to your email <span>${req.body.email}</span></p>`,
			image: '/images/logo.jpeg',
			blog,
		});
	} catch (error) {
		res.status(401).render('error', { error: error });
	}
});

router.get('/contact', async (req, res) => {
	try {
		let blog = await Blog.findOne({});
		res.render('contact', { blog });

		// if (blog == undefined || blog.length == 0 ) { blog = defaults.defaultBlog }
	} catch (error) {
		res.status(401).render('error', { error: error });
	}
});

router.post('/contact', async (req, res) => {
	const html = `<div data-role="module-unsubscribe" class="module" role="module" data-type="unsubscribe" style="color:#444444; font-size:12px; line-height:20px; padding:16px 16px 16px 16px; text-align:Center;" data-muid="4e838cf3-9892-4a6d-94d6-170e474d21e5">
    <img src="http://cdn.mcauto-images-production.sendgrid.net/5da8ea5c103c0a36/3c40c3f0-e64c-4eac-8a09-2f40383550a5/500x500.jpeg" style="width: 50%; ">
    
    <div style="font:20px Arial; line-height:36px;">
   Hi ${administrator}, ${req.body.name} wants to know more about your blog! <br>

 <h1 style="color: #119822; font: 800 1.5rem Arial;">Here is there form:</h1>
 <h3 style="color: #97bb5d; font: 600 1.3rem Arial;">Name</h3>
 <p style="color: #242424; font: 400 1.2rem Arial;">${req.body.name}</p>
 <h3 style="color: #97bb5d; font: 600 1.3rem Arial;">Email</h3>
 <p style="color: #242424; font: 400 1.2rem Arial;">${req.body.email}</p>
 <h3 style="color: #97bb5d; font: 600 1.3rem Arial;">Phone</h3>
 <p style="color: #242424; font: 400 1.2rem Arial;">${req.body.phone}</p>
 <h3 style="color: #97bb5d; font: 600 1.3rem Arial;">Message</h3>
 <p style="color: #242424; font: 400 1.2rem Arial;">${req.body.message}</p>

</div>
  </div>`;
	const subject = 'Someone has submitted a contact form!';

	email.newCommentContactEmail(subject, html);
	try {
		let blog = Blog.findOne({});

		if (blog == undefined || blog.length == 0) {
			blog = defaults.defaultBlog;
		}

		res.render('success-message', {
			message: `<h3 style="color: #97bb5d; font: 600 1.3rem Arial; margin: 3rem auto 1.5rem">Thank you, ${req.body.name}!</h3>
    <p style="color: #242424; font: 400 1.2rem Arial;">I have received your email and shall be getting back to you soon!</p>`,
			blog,
		});
	} catch (error) {}
});

router.get('/', async (req, res) => {
	try {
		let comments = await Comment.find({})
			.sort({ createdAt: -1 })
			.limit(20)
			.exec();
		let posts = await Post.find({}).sort({ date: -1 }).limit(4).exec();
		let blog = await Blog.findOne({});

		// if (comments == undefined || comments.length == 0) { comments = defaults.defaultComments}
		// if (posts == undefined || posts.length == 0) { posts = defaults.defaultPosts}
		// if (blog == undefined || blog.length == 0 ) { blog = defaults.defaultBlog }

		res.render('index', { posts, comments, blog });
	} catch (error) {
		res.status(401).render('error', { error: error });
	}
});

module.exports = router;
