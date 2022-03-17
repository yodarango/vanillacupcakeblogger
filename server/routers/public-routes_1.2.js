//express & tools
const express = require('express');
const router = express.Router();
const methodOverride = require('method-override');

//middleware
router.use(express.json());
router.use(express.urlencoded({ extended: false }));
router.use(methodOverride('_method'));

//models
const Blog = require('../models/blog-model');

// helpers
const { sendTheMail } = require('../helpers/nodemailer.js');

router.post('/my-form', async (req, res) => {
	const blog = await Blog.find({});

	new String();
	var data = Object.keys(req.body).map((key) => [String(key), req.body[key]]);

	console.log(req.body);
	console.log(data);
	sendTheMail(data);
	try {
		res.render('success-message', {
			message: 'Your from was submitted successfully',
			blog,
		});
	} catch (error) {
		res;
	}
});

module.exports = router;
