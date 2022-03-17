//express & tools
const express = require('express');
const router = express.Router();
const format = require('date-fns/format');
const methodOverride = require('method-override');

//middleware
router.use(express.json());
router.use(express.urlencoded({ extended: false }));
router.use(methodOverride('_method'));

//models
const Post = require('../models/post-models');
const Blog = require('../models/blog-model');
const Subscriber = require('../models/subscribers-model');
const Comment = require('../models/comments-model');
const MoreSettings = require('../models/more-settings-model');

// helpers
// helpers
const {
	newCommentEmail,
	newSubscriberEmail,
	newSubscriberAdminEmail,
	newContactFormEmail,
} = require('../helpers/nodemailer');

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
		// if (req.query.tag) {
		// 	let posts = await Post.find({ category: req.query.tag })
		// 		.sort({ date: -1 })
		// 		.limit(10)
		// 		.skip(parseInt(req.query.skip))
		// 		.exec();
		// }
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
	newCommentEmail(req.body.name, req.body.comment);

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

		res.render('about', { blog, count, postCount, commentCount });
	} catch (error) {
		res.status(401).render('error', { error: errors });
	}
});

router.post('/subscribers', async (req, res) => {
	newSubscriberEmail(req.body.email);
	newSubscriberAdminEmail(req.body.name);

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
	newContactFormEmail(
		req.body.name,
		req.body.email,
		req.body.phone,
		req.body.message
	);

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

		let postsToShowArray = await MoreSettings.findOne({});

		let posts = await Post.find({
			_id: { $in: postsToShowArray.last_posts_to_show },
		})
			.sort({ date: -1 })
			.limit(6)
			.exec();

		let blog = await Blog.findOne({});

		let moreSettings = await MoreSettings.findOne({});

		res.render('index', { posts, comments, blog, moreSettings });
	} catch (error) {
		console.log(error);
		res.status(401); //.render('error', { error: error });
	}
});

module.exports = router;
