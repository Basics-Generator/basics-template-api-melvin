exports.home = function(req, res) {
	res.render('home.ejs', {});
}

exports.forgotPassword = function(req, res) {
	res.render('forgotPassword.ejs', {});
}