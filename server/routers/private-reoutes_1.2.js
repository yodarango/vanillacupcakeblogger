//require('dotenv').config();
const express = require('express');
const router = express.Router();
const methodOverride = require('method-override');

//middleware
router.use(express.json({ limit: '50MB' }));
router.use(express.urlencoded({ extended: false }));
router.use(methodOverride('_method'));

// helpers
const { isLoggedIn, isLoggedOut } = require('./private-routes');

// models
const MoreSettings = require('../models/more-settings-model');

//owner settings

router.patch('/edit-show-sections', isLoggedIn, async (req, res) => {
	console.log('body: ', req.body);
	const postsToShowArray = req.body.last_posts_to_show
		? req.body.last_posts_to_show.trim().split(' ')
		: '622f8dd18a09a444fff14627';
	try {
		await MoreSettings.updateOne(
			{},
			{
				show_last_posts: req.body.show_last_posts ? 'checked' : '',
				last_posts_to_show: postsToShowArray,
			}
		);
		res.status(200).redirect('/account/settings');
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
