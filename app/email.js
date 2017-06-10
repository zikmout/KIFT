var nodemailer = require('nodemailer');


exports.email = function(email_data, callback) {
	/*
		This function expects email_data which is a json obj as follows:
		email_data = {
			"subj": "required subj",
			"message": "the message to be send",
			"html": "string of html scripting if any",
			"email_to": "email@domain.com"
		}


		AND IT NEEDS A CALLBACK FUNCTION
	*/

	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'blockchainstudio@gmail.com',
			pass: 'easyPASSWORD'
		}
	});

	var mailOptions = {
		from: '"Dream Team" <blockchainstudio@gmail.com>',
		to: email_data.email_to,
		subject: email_data.subj,
		text: email_data.message,
		html: email_data.html
	};

	transporter.sendMail(mailOptions, function(err_mail, info_mail){
		if (err_mail) callback(true, err_mail);
		callback(false, 'Email Sent: ' + email_data.email_to + ' with subject: ' + email_data.subj + '\n' + info_mail.response);
	});
}


/*

The function emailUser is an old one. it was custom made to send emails,
when new project was created, Please use the function for now, it is more
dynamic and generic and can be used by any function to send emails

The function emailUser can be substituted by the above function only if we have
a story on it, as we need to change things in the function create project.


*/


exports.emailUser = function (user_data, proj_det,callback) {
//var emailUser = function (data, callback) {
	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'blockchainstudio@gmail.com',
			pass: 'easyPASSWORD'
		}
	});
	var message = 'Hello ' + user_data.firstname + ',\n\nWelcome, you are added to a new project named ' + proj_det.name + ' as a ' + proj_det.permission + '.\n\nThe Project is a lot about, '+proj_det.description+'\n\nThe managers of the project are as follows:\n';
	for(var index in proj_det.Managers){
		message = message + proj_det.Managers[index].firstname + ' ' + proj_det.Managers[index].lastname + '\n';
	}

	message = message + '\n\nKind Regards,\nThe Dream Team.';
	var mailOptions = {
		from: '"Dream Team" <blockchainstudio@gmail.com>',
		to: user_data.email,
		subject: 'Welcome you are ADDED on a BlockChain',
		text: message
	};

//	console.log(mailOptions);

	transporter.sendMail(mailOptions, function(err_mail, info_mail){
		if (err_mail) callback(true, err_mail);
		callback(false, 'Email Sent: ' + user_data.email + ' ' + proj_det.permission + ' ' + info_mail.response);
	});
}
/*
emailUser({
	"email": "ppokar42@gmail.com",
	"firstname": "Parth",
	"permission": "Designer"
}, function (error, info) {
	if (error) console.log(error);
	else console.log(info);
});*/