//require('dotenv').config();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SEND_GRID);

const verifiedSGSender = 'paradymuseless@gmail.com';

module.exports.sendEmail = async (to, subject, html) => {
	const msg = {
		to: to,
		from: verifiedSGSender,
		subject: subject,
		text: 'new post email',
		html: html,
	};
	try {
		await sgMail.sendMultiple(msg);
		console.log('Sent');
	} catch (error) {
		console.log('THIS IS AN ERROR' + error);
	}
};

module.exports.subscriberEmail = async (email, subject, html) => {
	const msg = {
		to: email,
		from: verifiedSGSender,
		subject: subject,
		text: 'subscription email',
		html: html,
	};
	try {
		await sgMail.send(msg);
		console.log('Sent');
	} catch (error) {
		console.log('THIS IS AN ERROR' + error);
	}
};

//sends an email to owner everytime someone comments
module.exports.newCommentContactEmail = async (subject, html) => {
	const msg = {
		to: verifiedSGSender,
		from: verifiedSGSender,
		subject: subject,
		text: 'new email',
		html: html,
	};
	try {
		await sgMail.send(msg);
		console.log('Sent');
	} catch (error) {
		console.log('THIS IS AN ERROR' + error);
	}
};
