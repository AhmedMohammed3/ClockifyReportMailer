const nodemailer = require('nodemailer');

let transport = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	auth: {
		user: process.env.SENDING_EMAIL_USERNAME,
		pass: process.env.SENDING_EMAIL_PASSWORD
	}
});

exports.sendMail = async (html, name, fromDate, toDate) => {
	let mailOptions = {
		from: process.env.SENDING_EMAIL_USERNAME,
		to: process.env.RECIEVING_EMAIL_USERNAME,
		subject: `${name}'s weekly report from ${fromDate} to ${toDate}`,
		html
	};
	await transport.sendMail(mailOptions, function (err, info) {
		if (err) {
			console.log(err);
		} else {
			console.log('Mail Sent!');
			console.log(info);
		}
	});
};
