const mongoose = require('mongoose');

var placeSchema = mongoose.Schema({
	name					: 	String,
    description				: 	String,
    address                 :   String,
    location: { 
        type: { type: String }, 
        coordinates: [Number] 
    },
});

placeSchema.index({ location: '2dsphere' });
module.exports = mongoose.model('Place', placeSchema);