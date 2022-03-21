//require('dotenv').config();
const nodemailer = require('nodemailer');

// admin
const administrator = process.env.ADMIN_NAME;
const ownerDomain = process.env.ADMIN_HOST;
const adminEmail = process.env.ADMIN_EMAIL;
const authEmail = process.env.ADMIN_SMTP;
const hostSMTP = process.env.HOST_SMTP;

const transporter = nodemailer.createTransport({
	host: hostSMTP, //'smtp.gmail.com', // hostname
	secureConnection: false, // TLS requires secureConnection to be false
	port: 587, // port for secure SMTP
	auth: {
		user: process.env.ADMIN_SMTP,
		pass: process.env.EMAIL_PASSWORD,
	},
});

const sendIt = (mailOptions) => {
	console.log('reached');
	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
		} else {
			console.log('mail sent!', info);
		}
	});
};

module.exports.trialRequestEmail = (name, email, domain, colors) => {
	const mailOptions = {
		from: authEmail,
		to: adminEmail,
		subject: `New Trial Request`,
		html: `<html>
      <head>
        <title>Form Submission</title>
        <style>
        
        .title{
            font: 800 1.5rem sans-serif;
            width: 100%;
            text-align: center;
        }
        
        h2{
              font: 500 1.2rem sans-serif;
              color: #003388;
            }
            
        p{
            width: 100%;
              font: 500 1.2rem sans-serif;
              margin: 2rem auto;
            }

            .key{
                color: #222b7d;
            }

            .value{
                color: #171e30;
            }
        
        </style>
      </head>
    <body>
     <h2>New Trial Request</h2>
    <p>Name: ${name}</p>
    <p>Email: ${email}</p>
    <p>Domain: ${domain}</p>
    <p>Colors: ${colors}</p>
      </body>
    </html>`,
	};

	sendIt(mailOptions);
};
