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

module.exports.sendTheMail = (fields) => {
	const mailOptions = {
		from: authEmail,
		to: adminEmail,
		subject: `Form from post was submitted`,
		html: `<html>
      <head>
        <title>Form Submission</title>
        <style>
        .thumbnail{
          width: 100%;
          background-image: url('https://res.cloudinary.com/pressonponderings-com/image/upload/v1647443745/emails/mathyas-kurmann-fb7yNPbT0l8-unsplash_1_xpnrbi.jpg');
          height: 100vw;
          max-width: 500px;
          max-height: 500px;
          margin: auto auto auto 0;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
        
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
     <div class="thumbnail"></div>
     <h2>A form was submitted successfully from one of your posts. Below is the data collected</h2>
        <div>
        ${fields.map(
				(item) =>
					`<p class="key">${item[0]}: <span class="value">${item[1]} </span></p>`
			)}
        </div>
      </body>
    </html>`,
	};

	sendIt(mailOptions);
};

module.exports.newPostEmail = (users) => {
	const mailOptions = {
		from: authEmail,
		to: users,
		subject: `${administrator} just uploaded a new blog! `,
		html: `<html>
      <head>
        <title>New Post</title>
        <style>
        .thumbnail{
          width: 100%;
          background-image: url('https://res.cloudinary.com/pressonponderings-com/image/upload/v1647453371/emails/food2_1_tjaxba.jpg');
          height: 100vw;
          max-width: 500px;
          max-height: 500px;
          margin: auto auto auto 0;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
        
        .title{
            font: 800 1.5rem sans-serif;
            width: 100%;
            text-align: center;
        }
        
        h2{
              font: 500 1.5rem sans-serif;
              color: #6f3287;
            }
        h1{
            font: 800 2rem sans-serif;
            color: #fcba03;
        }
            
        p{
            width: 100%;
              font: 500 1.2rem sans-serif;
              margin: 2rem auto;
            }

        .button{
            padding: .5rem;
            color: white;
            background-color: #242424;
            font: 500 1.5rem sans-serif;
            display: block;
            margin-top: 2rem;
            max-width: 10rem;
        }
        
        </style>
      </head>
    <body>
    <h1>Hello from ${administrator} 👋!</h1>
     <div class="thumbnail"></div>
     <h2>I just shared my newest post, be the first one to see it! 😊</h2>
     <a href="${ownerDomain}/posts" class="button">READ NOW</a>
      </body>
    </html>`,
	};

	sendIt(mailOptions);
};

module.exports.newPasswordEmail = (password) => {
	const mailOptions = {
		from: authEmail,
		to: adminEmail,
		subject: `your password has changed `,
		html: `<html>
      <head>
        <title>New Post</title>
        <style>
        .thumbnail{
          width: 100%;
          background-image: url('https://res.cloudinary.com/pressonponderings-com/image/upload/v1647448187/emails/lock_bp8wu4.jpg');
          height: 100vw;
          max-width: 500px;
          max-height: 500px;
          margin: auto auto auto 0;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
        
        .title{
            font: 800 1.5rem sans-serif;
            width: 100%;
            text-align: center;
        }
        
        h2{
              font: 500 1.5rem sans-serif;
              color: #6f3287;
            }
        h1{
            font: 800 2rem sans-serif;
            color: #fcba03;
        }
            
        p{
            width: 100%;
              font: 500 1.2rem sans-serif;
              margin: 2rem auto;
            }

        .button{
            padding: .5rem;
            color: white;
            background-color: #242424;
            font: 500 1.5rem sans-serif;
            display: block;
            margin-top: 2rem;
            max-width: 10rem;
        }

        .password{
            color: #307a2b;
        }
        
        </style>
      </head>
    <body>
    <h1>Your Password was updated 🔒!</h1>
     <div class="thumbnail"></div>
     <h2>This is your new password:</h2>
     <h2 class="password">${password}</h2>
     <a href="https://${ownerDomain}/account/profile" class="button">GO TO MY ACCOUNT</a>
      </body>
    </html>`,
	};

	sendIt(mailOptions);
};

module.exports.newCommentEmail = (name, comment) => {
	const mailOptions = {
		from: authEmail,
		to: adminEmail,
		subject: `${name} just commented on your post`,
		html: `<html>
      <head>
        <title>New Post</title>
        <style>
        .thumbnail{
          width: 100%;
          background-image: url('https://res.cloudinary.com/pressonponderings-com/image/upload/v1647448168/emails/comment_orm938.jpg');
          height: 100vw;
          max-width: 500px;
          max-height: 500px;
          margin: auto auto auto 0;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
        
        .title{
            font: 800 1.5rem sans-serif;
            width: 100%;
            text-align: center;
        }
        
        h2{
              font: 500 1.5rem sans-serif;
              color: #6f3287;
            }
        h1{
            font: 800 2rem sans-serif;
            color: #fcba03;
        }
            
        p{
            width: 100%;
              font: 500 1.2rem sans-serif;
              margin: 2rem auto;
            }

        .button{
            padding: .5rem;
            color: white;
            background-color: #d2d2d2;
            text-decoration: none;
            font: 500 1.5rem sans-serif;
            display: block;
            margin-top: 2rem;
            max-width: 10rem;
        }

        .password{
            color: #307a2b;
        }
        
        </style>
      </head>
    <body>
    <h1>${name} just left you a comment 💻!</h1>
     <div class="thumbnail"></div>
     <h2>Here is what they said: </h2>
     <p>${comment}</p>
     <a href="${ownerDomain}/#public-comments-anchor" class="button">SEE IT NOW</a>
      </body>
    </html>`,
	};

	sendIt(mailOptions);
};

module.exports.newSubscriberEmail = (email) => {
	const mailOptions = {
		from: authEmail,
		to: email,
		subject: `Thank you for subscribing to my blog! 😊`,
		html: `<html>
      <head>
        <title>New Post</title>
        <style>
        .thumbnail{
          width: 100%;
          background-image: url('https://res.cloudinary.com/pressonponderings-com/image/upload/v1647443805/emails/pressonponderings_vkymes.png');
          height: 100vw;
          max-width: 500px;
          max-height: 500px;
          margin: auto auto auto 0;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
        
        .title{
            font: 800 1.5rem sans-serif;
            width: 100%;
            text-align: center;
        }
        
        h2{
              font: 500 1.5rem sans-serif;
              color: #6f3287;
            }
        h1{
            font: 800 2rem sans-serif;
            color: #fcba03;
        }
            
        p{
            width: 100%;
              font: 500 1.2rem sans-serif;
              margin: 2rem auto;
            }

        .button{
            padding: .5rem;
            color: white;
            background-color: #d2d2d2;
            text-decoration: none;
            font: 500 1.5rem sans-serif;
            display: block;
            margin-top: 2rem;
            max-width: 10rem;
        }

        .password{
            color: #307a2b;
        }
        
        </style>
      </head>
    <body>
    <h1>Tank you for subscribing!</h1>
     <div class="thumbnail"></div>
     <h2>No worries, I will not spam you with tons of email, just whenever new great stuff comes out 😉</h2>
      </body>
    </html>`,
	};

	sendIt(mailOptions);
};

module.exports.newSubscriberAdminEmail = (name) => {
	const mailOptions = {
		from: authEmail,
		to: adminEmail,
		subject: `You just got a new subscriber 😊`,
		html: `<html>
      <head>
        <title>New Post</title>
        <style>
        .thumbnail{
          width: 100%;
          background-image: url('https://res.cloudinary.com/pressonponderings-com/image/upload/v1647443805/emails/pressonponderings_vkymes.png');
          height: 100vw;
          max-width: 500px;
          max-height: 500px;
          margin: auto auto auto 0;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
        
        .title{
            font: 800 1.5rem sans-serif;
            width: 100%;
            text-align: center;
        }
        
        h2{
              font: 500 1.5rem sans-serif;
              color: #6f3287;
            }
        h1{
            font: 800 2rem sans-serif;
            color: #fcba03;
        }
            
        p{
            width: 100%;
              font: 500 1.2rem sans-serif;
              margin: 2rem auto;
            }

        .button{
            padding: .5rem;
            color: white;
            background-color: #d2d2d2;
            text-decoration: none;
            font: 500 1.5rem sans-serif;
            display: block;
            margin-top: 2rem;
            max-width: 10rem;
        }

        .password{
            color: #307a2b;
        }
        
        </style>
      </head>
    <body>
    <h1>You're doing great! 👍</h1>
     <div class="thumbnail"></div>
     <h2>${name} seems to be enjoying your blog so much that just became a subscriber! </h2>
      </body>
    </html>`,
	};

	sendIt(mailOptions);
};

module.exports.newContactFormEmail = (name, email, phone, message) => {
	const mailOptions = {
		from: authEmail,
		to: adminEmail,
		subject: `Someone sent a contact form from your blog`,
		html: `<html>
      <head>
        <title>New Post</title>
        <style>
        .thumbnail{
          width: 100%;
          background-image: url('https://res.cloudinary.com/pressonponderings-com/image/upload/v1647443745/emails/mathyas-kurmann-fb7yNPbT0l8-unsplash_1_xpnrbi.jpg');
          height: 100vw;
          max-width: 500px;
          max-height: 500px;
          margin: auto auto auto 0;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
        
        .title{
            font: 800 1.5rem sans-serif;
            width: 100%;
            text-align: center;
        }
        
        h2{
              font: 500 1.5rem sans-serif;
              color: #6f3287;
            }
        h1{
            font: 800 2rem sans-serif;
            color: #fcba03;
        }
            
        p{
            width: 100%;
              font: 500 1.2rem sans-serif;
              margin: 2rem auto;
            }

        .button{
            padding: .5rem;
            color: white;
            background-color: #d2d2d2;
            text-decoration: none;
            font: 500 1.5rem sans-serif;
            display: block;
            margin-top: 2rem;
            max-width: 10rem;
        }

        .password{
            color: #307a2b;
        }
        
        </style>
      </head>
    <body>
    <h1> Hi ${administrator}, ${name} has sent you a message from your contact page</h1>
     <div class="thumbnail"></div>
     
        <div style="font:20px Arial; line-height:36px;">
        
            <h2 style="color: #119822; font: 800 1.5rem Arial;">Below is the info: </h2>
            <h3 style="color: #97bb5d; font: 600 1.3rem Arial;">Name</h3>
            <p style="color: #242424; font: 400 1.2rem Arial;">${name}</p>
            <h3 style="color: #97bb5d; font: 600 1.3rem Arial;">Email</h3>
            <p style="color: #242424; font: 400 1.2rem Arial;">${email}</p>
            <h3 style="color: #97bb5d; font: 600 1.3rem Arial;">Phone</h3>
            <p style="color: #242424; font: 400 1.2rem Arial;">${phone}</p>
            <h3 style="color: #97bb5d; font: 600 1.3rem Arial;">Message</h3>
            <p style="color: #242424; font: 400 1.2rem Arial;">${message}</p>
        
        </div>
      </body>
    </html>`,
	};

	sendIt(mailOptions);
};
