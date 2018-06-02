"use strict";

var SharedResponseGenerator = (function () {
    var instance;
 
    function createInstance() {
        var object = new ResponseGenerator();
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

class ResponseGenerator {

	constructor() {
	}

	generate(res, endpoint, status, message) {// -> res 
		return res.status(status).send({ 
			endpoint: endpoint,
			message: message
		});
	}

	generateLogin(res, endpoint, status, message, token) {// -> res 
		return res.status(status).send({ 
			endpoint: endpoint,
			message: message,
			token: token
		});
	}

	generateAlternative(res, endpoint, status, message, newAppointments) {// -> res 
		return res.status(status).send({ 
			endpoint: endpoint,
			message: message,
			newAppointments: newAppointments
		});
	}
}

module.exports = SharedResponseGenerator;