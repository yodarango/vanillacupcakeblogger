//require('dotenv').config();
const format = require('date-fns/format');
const express = require('express');
const session = require('express-session');
const multer = require('multer');
const sharp = require('sharp');
const methodOverride = require('method-override');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const router = express.Router();

const Post = require('../models/post-models');
const Blog = require('../models/blog-model');
const Subscriber = require('../models/subscribers-model');
const Comment = require('../models/comments-model');
const User = require('../models/User-model');
const MoreSettings = require('../models/more-settings-model');

// helpers
const { newPostEmail, newPasswordEmail } = require('../helpers/nodemailer');

//default setting for brand new blog
//const defaults               = require('../../db/default-db-values');

//middleware
router.use(express.json({ limit: '50MB' }));
router.use(express.urlencoded({ extended: false }));
router.use(methodOverride('_method'));
router.use(
	session({
		secret: process.env.SECRET,
		resave: true,
		saveUninitialized: true,
		store: MongoStore.create({ mongoUrl: process.env.MONGO_DB }),
		ttl: 60 * 60 * 24,
	})
);
router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser(function (user, done) {
	done(null, user.id);
});
passport.deserializeUser(function (id, done) {
	User.findById(id, function (err, user) {
		done(err, user);
	});
});

passport.use(
	new LocalStrategy(function (username, password, done) {
		User.findOne({ username: username }, function (err, user) {
			if (err) return done(err);
			if (!user)
				return done(null, false, { message: 'Incorrect username.' });

			bcrypt.compare(password, user.password, function (err, res) {
				if (err) return done(err);
				if (res === false)
					return done(null, false, { message: 'Incorrect password.' });

				return done(null, user);
			});
		});
	})
);

// router.use((req, res, next)=>{
//     console.log(req.session)
//     console.log(req.user)
//     next()
// })

function isLoggedIn(req, res, next) {
	// if (req.isAuthenticated()) return next();
	// res.redirect('/account/login');
	return next();
}

function isLoggedOut(req, res, next) {
	if (!req.isAuthenticated()) return next();
	res.redirect('/account/profile');
}

////*****************POSTS ROUTES *******/
router.get('/new', isLoggedIn, async (req, res) => {
	try {
		let blog = await Blog.findOne({});

		//if (blog == undefined || blog.length == 0 ) { blog = defaults.defaultBlog }

		res.render('new-ckeditor-full-pkg', { blog });
	} catch (error) {
		res.status(401).render('error', { error: error });
	}
});

router.get('/edit-post/:id', isLoggedIn, async (req, res) => {
	try {
		let post = await Post.findOne({ _id: req.params.id });
		let blog = await Blog.findOne({});
		post === undefined
			? (post = {
					postContent:
						'<h1 style="text-align: center; height: 3rem: width: 100%; margin: 3rem 0; font-family: Arial, sans-serif;">Sorry, no posts available</h1>',
			  })
			: (post = post);

		//if (blog == undefined || blog.length == 0 ) { blog = defaults.defaultBlog }
		res.render('edit-post-ckeditor-full-pkg', { blog, post });
	} catch (error) {
		res.send(error);
	}
});

router.put('/edit-post/:id', isLoggedIn, async (req, res) => {
	try {
		const post = await Post.updateOne(
			{ _id: req.params.id },
			{
				$set: {
					...req.body,
				},
			}
		);

		res.render({ message: 'post updated sucessfully' });
	} catch (error) {
		res.send(error);
	}
});

router.post('/new', isLoggedIn, async (req, res) => {
	const subs = await Subscriber.find({}, { email: 1, _id: 0 });
	const receptors = [];

	subs.forEach((sub) => receptors.push(sub.email));

	if (req.body.sendEmail === 'yes') {
		newPostEmail(receptors);
	}

	const post = new Post({
		...req.body,
		date: Date.now(),
		created: format(new Date(), 'MM/dd/yyyy h:mm'),
	});

	const blog = await Blog.findOne({});

	try {
		await post.save();
		res.send({ message: `Your Post has been updated Successfully!` });
	} catch (error) {
		res.render('error,', {
			error: 'Something went wrong. Some errors might originate if your post does not have a title or a description',
			blog,
		});
	}
});

router.delete('/:id', isLoggedIn, async (req, res) => {
	try {
		await Post.deleteOne({ _id: req.params.id });
		res.redirect('/account/profile');
	} catch (error) {
		res.status(401).render('error', { error: error });
	}
});

////*****************LOGIN ROUTES *******/

router.post(
	'/login',
	passport.authenticate('local', {
		successRedirect: '/account/profile',
		failureRedirect: '/account/login',
		error: true,
	})
);

router.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/account/login');
});

router.get('/login', isLoggedOut, async (req, res) => {
	try {
		let blog = await Blog.findOne({});

		res.render('login', { blog });
	} catch (error) {
		res.status(401).render('error', { error: error });
	}
});

////*****************PROFILE PAGE ROUTES *******/
router.get('/profile', isLoggedIn, async (req, res) => {
	let more;
	Number.isNaN(parseInt(req.query.skip))
		? (more = 10)
		: (more = parseInt(req.query.skip) + 10);
	try {
		let count = await Post.find().countDocuments({});
		let posts = await Post.find({})
			.sort({ date: -1 })
			.limit(10)
			.skip(parseInt(req.query.skip))
			.exec();
		let blog = await Blog.findOne({});
		const moreSettings = await MoreSettings.findOne({});

		res.render('profile', {
			blog,
			posts,
			count,
			more,
			less: more - 20,
			moreSettings,
		});
	} catch (error) {
		res.status(401).render('error', { error: error });
	}
});

router.post('/profile', isLoggedIn, async (req, res) => {
	const param = req.body.filter === undefined ? '' : req.body.filter;
	const regex = new RegExp(`${param}`);
	try {
		const count = await Post.find().countDocuments({ postContent: regex });
		const posts = await Post.find({ postContent: regex })
			.sort({ date: 1 })
			.exec();
		const blog = await Blog.findOne({});

		res.render('profile', { blog, posts, count, more: 10, less: 0 });
	} catch (error) {
		res.status(401).render('error', { error: error });
	}
});

router.get('/comments', isLoggedIn, async (req, res) => {
	try {
		let count = await Comment.find({}).countDocuments({});
		let comments = await Comment.find({})
			.limit(3000)
			.sort({ createdAt: -1 })
			.exec();

		// if (count == undefined || count.length == 0) { count = 1}
		// if (comments == undefined || comments.length == 0) { comments = defaults.defaultComments}

		const data = {
			count: count,
			comments: comments,
		};
		res.json(data);
	} catch (error) {
		res.status(401).render('error', { error: error });
	}
});

router.get('/subscribers', isLoggedIn, async (req, res) => {
	try {
		let count = await Subscriber.find().countDocuments({});
		let subscribers = await Subscriber.find({})
			.limit(500)
			.sort({ subscribedOn: -1 })
			.exec();

		const data = {
			count: count,
			subscribers: subscribers,
		};
		res.json(data);
	} catch (error) {
		res.status(401).render('error', { error: error });
	}
});

router.delete('/delete-comment/:id', isLoggedIn, async (req, res) => {
	try {
		await Comment.deleteOne({ _id: req.params.id });
		res.redirect('/account/profile');
	} catch (error) {
		res.status(401).render('error', { error: error });
	}
});

router.delete('/delete-subscriber/:id', isLoggedIn, async (req, res) => {
	try {
		await Subscriber.deleteOne({ _id: req.params.id });
		res.redirect('/account/profile');
	} catch (error) {
		res.status(401).render('error', { error: error });
	}
});

////*****************SETTINGS PAGE ROUTES *******/

router.get('/settings', isLoggedIn, async (req, res) => {
	try {
		let comments = await Comment.find({});
		let subscribers = await Subscriber.find({});
		let posts = await Post.find({});
		let blog = await Blog.findOne({});
		let moreSettings = await MoreSettings.findOne({});

		res.render('settings', {
			blog,
			posts,
			subscribers,
			comments,
			moreSettings,
		});
	} catch (error) {
		res.status(401).render('error', { error: error });
	}
});

const upload = multer({
	limits: {
		fileSize: 3000000,
	},
	fileFilter(req, file, cb) {
		if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
			return cb(new Error('File type not supported'));
		}
		cb(undefined, true);
	},
});

//update the homepage background
router.post(
	'/upload-background',
	isLoggedIn,
	upload.single('background'),
	async (req, res) => {
		try {
			const buffer = await sharp(req.file.buffer).png().toBuffer();
			await Blog.updateOne(
				{},
				{ $set: { background: buffer.toString('base64') } }
			);
			res.redirect('/account/settings');
		} catch (error) {
			res.status(401).render('error', { error: error });
		}
	},
	(error, req, res, next) => {
		const blog = Blog.findOne({});
		res.render('error', { blog, error: error.message });
	}
);

//update the index page logo
router.post(
	'/upload-logo',
	isLoggedIn,
	upload.single('logo'),
	async (req, res) => {
		try {
			const buffer = await sharp(req.file.buffer)
				.resize({ width: 500, height: 500 })
				.png()
				.toBuffer();
			await Blog.updateOne(
				{},
				{ $set: { logo: buffer.toString('base64') } }
			);
			res.redirect('/account/settings');
		} catch (error) {
			res.status(401).render('error', { error: error });
		}
	},
	(error, req, res, next) => {
		const blog = Blog.findOne({});
		res.render('error', { blog, error: error.message });
	}
);

//update the index featured image logo
router.post(
	'/upload-featured-image',
	isLoggedIn,
	upload.single('featuredImage'),
	async (req, res) => {
		try {
			const buffer = await sharp(req.file.buffer)
				.resize({ width: 1000, height: 800 })
				.png()
				.toBuffer();
			await Blog.updateOne(
				{},
				{ $set: { featuredImage: buffer.toString('base64') } }
			);
			res.redirect('/account/settings');
		} catch (error) {
			res.status(401).render('error', { error: error });
		}
	},
	(error, req, res, next) => {
		const blog = Blog.findOne({});
		res.render('error', { blog, error: error.message });
	}
);

//update profile image
router.post(
	'/update-profile-image',
	isLoggedIn,
	upload.single('profileImage'),
	async (req, res) => {
		try {
			const buffer = await sharp(req.file.buffer)
				.resize({ width: 500, height: 500 })
				.png()
				.toBuffer();
			await Blog.updateOne(
				{},
				{ $set: { profileImage: buffer.toString('base64') } }
			);
			res.redirect('/account/settings');
		} catch (error) {
			res.status(401).render('error', { error: error });
		}
	},
	(error, req, res, next) => {
		const blog = Blog.findOne({});
		res.render('error', { blog, error: error.message });
	}
);

router.patch('/edit-home-page', isLoggedIn, async (req, res) => {
	try {
		await Blog.updateOne({}, { ...req.body });
		res.status(200).redirect('/account/settings');
		console.log(req.body);
	} catch (error) {
		res.status(401).render('error', { error: error });
	}
});

router.patch('/edit-home-page-sm', async (req, res) => {
	try {
		await Blog.updateOne(
			{},
			{
				$set: {
					youtubeShow:
						req.body.youtubeShow === undefined
							? (req.body.youtubeShow = '')
							: (req.body.youtubeShow = 'checked'),
					instagramShow:
						req.body.instagramShow === undefined
							? (req.body.instagramShow = '')
							: (req.body.instagramShow = 'checked'),
					twitterShow:
						req.body.twitterShow === undefined
							? (req.body.twitterShow = '')
							: (req.body.twitterShow = 'checked'),
					pinterestShow:
						req.body.pinterestShow === undefined
							? (req.body.pinterestShow = '')
							: (req.body.pinterestShow = 'checked'),
					facebookShow:
						req.body.facebookShow === undefined
							? (req.body.facebookShow = '')
							: (req.body.facebookShow = 'checked'),
					facebookUrl: req.body.facebookUrl,
					youtubeUrl: req.body.youtubeUrl,
					twitterUrl: req.body.twitterUrl,
					pinterestUrl: req.body.pinterestUrl,
					instagramUrl: req.body.instagramUrl,
				},
			}
		);
		res.status(200).redirect('/account/settings');
		console.log(req.body);
	} catch (error) {
		console.log(error);
	}
});

router.put('/edit-categories', isLoggedIn, async (req, res) => {
	try {
		await Blog.updateOne({}, { $push: { categories: req.body.categories } });
		console.log(req.body.categories);
		res.redirect('/account/settings');
	} catch (error) {
		res.status(401).render('error', { error: error });
	}
});

router.delete('/delete-categories/:category', isLoggedIn, async (req, res) => {
	try {
		await Blog.updateOne({}, { $pull: { categories: req.params.category } });
		res.redirect('/account/settings');
	} catch (error) {
		res.status(401).render('error', { error: error });
	}
});

router.get('', isLoggedIn, async (req, res) => {
	try {
		const blog = await Blog.findOne({});
		const user = await User.findOne({});

		res.render('account', { blog, user });
	} catch (error) {
		res.status(401).render('error', { error: error });
	}
});

router.patch('', isLoggedIn, async (req, res) => {
	newPasswordEmail(req.body.password);
	try {
		const blog = await Blog.findOne({});

		//if (blog == undefined || blog.length == 0 ) { blog = defaults.defaultBlog}
		bcrypt.genSalt(10, function (err, salt) {
			if (err) return next(err);
			bcrypt.hash(req.body.password, salt, async (err, hash) => {
				if (err) return next(err);
				try {
					await User.updateOne(
						{},
						{ $set: { password: hash, username: req.body.username } }
					);
					res.render('success-message', {
						blog,
						message: `<h2 style="color: #119822; width: 100%; margin: auto; text-align: center;">Your password has been updated Successfully!</h2>`,
					});
				} catch (error) {
					res.render('/error', { error: error });
				}
			});
		});
	} catch (error) {
		res.render('/error', { error: error });
	}
});

module.exports = { router, isLoggedIn, isLoggedOut };
