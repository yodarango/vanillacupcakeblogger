const express = require('express');
const router = express.Router();

// models
const Blog = require('../models/blog-model');

//middleware
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

// helpers
const { trialRequestEmail } = require('../helpers/trial');

router.get('/trial', (req, res) => {
	res.render('trial');
});

router.post('/trial', async (req, res) => {
	trialRequestEmail(
		req.body.name,
		req.body.email,
		req.body.domain,
		req.body.colors
	);

	try {
		const blog = await Blog.findOne({});

		res.render('success-message', {
			blog,
			message:
				'Thank you! Your form has been submited. you will receive an email once your blog is ready! ',
		});
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
