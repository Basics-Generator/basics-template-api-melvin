var Place  						= require('../../../models/place/place'); // get our mongoose model
var ResponseGenerator       	= require('../../../helper/ResponseGenerator'); // get our mongoose model
var googleMapsClient            = require('@google/maps').createClient({
    key: process.env.GOOGLE_API_KEY
  });

////////////////////////////////////////////////////////////
////////////       POST CREATE PLACE            ////////////
//////////////////////////////////////////////////////////// 
exports.add = function(req, res) {
	if (req.body.name == undefined 
        || req.body.description == undefined
        || req.body.address == undefined) {
		return ResponseGenerator.getInstance().generate(res, "CREATE PLACE", 400, 'Missing parameters');
	}

	if (req.body.name == ""
        || req.body.description == ""
        || req.body.address == "") {
		return ResponseGenerator.getInstance().generate(res, "CREATE PLACE", 400, 'Empty parameters');
	}

	addPlace(req, res, (res) => {
			return ResponseGenerator.getInstance().generate(res, "CREATE PLACE", 201, 'Place created successfully')
	    });
}


exports.get = function(req, res) {
    res.render('place.ejs');
}
////////////////////////////////////////////////////////////
////////////            CREATE PLACE            ////////////
//////////////////////////////////////////////////////////// 
function addPlace(req, res, successCallback) {
    let location = googleMapsClient.geocode({
        address: req.body.address
      }, function(err, res) {
        if (!err) {
            return JSON.parse(JSON.stringify(res.json.results[0]));
        }
      });
      
      var newPlace = new Place({
		name            : req.body.name,
        description		: req.body.description,
        address         : req.body.address,
        location        : location,
	});

	newPlace.save((err) => {
		if (err) throw err;
		successCallback(res);
	});
}

////////////////////////////////////////////////////////////
////////////              GET PLACE             ////////////
//////////////////////////////////////////////////////////// 
exports.list = (req, res) => {
	Place.find({}).exec((err, events) => {
		if (err) throw err;
		return res.status(200).send({ endpoint: "GET PLACE", message: "Get places list successfully", events:events });
	});
}