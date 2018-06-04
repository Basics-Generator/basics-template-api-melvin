"use strict";

var nodemailer              = require('nodemailer');

var SharedMailer = (function () {
    var instance;
 
    function createInstance() {
        var object = new Mailer();
        return object;
    }
 
    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

class Mailer {

	constructor() {
	}

	sendMail(user, subject, message) {
	    var transporter = nodemailer.createTransport({
	        service: 'gmail',
	        auth: {
	            user: 'basics.nobullshiiit@gmail.com',
	            pass: 'OgbN5uet94'
	        }
	    });

	    var mailOptions = {
	        from: 'no-reply@basics-nobullshit.com',
	        to: user.email,
	        subject: subject,
	        text: message
	    };

	    transporter.sendMail(mailOptions, function(error, info){
	        if (error) {
	            console.log(error);
	        }
	        else {
	            console.log('Email sent: ' + info.response);
	        }
	    });
	}

}

module.exports = SharedMailer;