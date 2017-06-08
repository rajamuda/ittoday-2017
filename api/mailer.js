'use strict';
var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 465,
	secure: true, // secure:true for port 465, secure:false for port 587
	auth: {
		user: 'ittodayipb2017@gmail.com',
		pass: 'YOUR_KEY_HERE'
	}
});


function Mailer(){
	this.sendMail = function(options, res){
		// setup email data with unicode symbols

		/*
			options = {
				mailto: to whom
				subject: your mail subject
				template: { 'reset_pass', 'payment_reminder', 'confirm_seminar', 'custom' }
				customMsg: html for custom message (optional)
				customVar: variable whatever you like. ex: for reset_pass template, forget password token set as customVar
			}
		*/
		var mailto = options.mailto;
		var mailsubject = options.subject;
		var mailtemplate = options.template;
		var mailhtml;

		if (mailtemplate == 'reset_pass') {
			mailhtml = `
				<p> Kami menerima permintaan Anda untuk melakukan <i>reset password</i> </p>
				<p> Silakan salin <b>token</b> di bawah ini dan masukan di laman <i><a href="https://ittoday.web.id/auth/resetpass">reset password</a></i>
				<p> <b><i>Token: `+ options.customVar +` </i></b>
			`;

		} else if (mailtemplate == 'payment_reminder') {
			mailhtml = 'nothing';
		} else if (mailtemplate == 'confirm_seminar') {
			mailhtml = 'nothing';
		} else {
			mailhtml = options.customMsg;
		}

		var mailOptions = {
			from: '"IT Today IPB" <ittodayipb2017@gmail.com>', // sender address
			to: mailto, // list of receivers
			subject: mailsubject, // Subject line
			html: mailhtml // html body
		};

		// send mail with defined transport object
		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				res.json({status: false, message: 'Mail sent failed', err: error});
			} else {
				console.log('Message %s sent: %s', info.messageId, info.response);
				res.json({status: true, message: 'Mail has been sent'});
			}
		});
	}
}

module.exports = new Mailer();