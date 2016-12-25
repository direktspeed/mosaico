/**
 * @module {function} services/templatesfilleds /services/templatesfilleds
 * @parent mosaico.services
 *
 * @signature `GET /services/templatesfilleds`
 *   Gets templatesfilleds from the database
 *
 *     GET /services/games?
 *         where[playerId]=5&
 *         sortBy=startRank
 *
 * @param {Object} [where] Clause used to filter which templatesfilleds are returned.
 * @param {String} [sortBy] Clause used to sort the returned templatesfilleds
 * @return {JSON} An object that contains the player data:
 *
 *     {data: [{
 *         id: Int,
 *         name: String,		// TemplatesFilled name
 *         weight: Int,			// TemplatesFilled weight, in lbs
 *         height: Int,			// TemplatesFilled height, in inches
 *         birthday: Date, 		// TemplatesFilled birthday
 *         profile: String, 	// TemplatesFilled description/bio
 *         startRank: String	// Starting Rank
 *     }]}
 *
 * @signature `POST /services/templatesfilleds`
 *   Adds a player to the database. Only admins are allowed to create templatesfilleds.
 *
 *     POST /services/templatesfilleds
 *          {
 *            "name": "Harper Lee",
 *            "weight": 190,
 *            "height": 72,
 *            "birthday": "1990-01-22",
 *            "profile": "Author of 'To Kill a Mockingbird'",
 *            "startRank": "novice"
 *          }
 *
 * @param {JSON} JSONBody The Raw JSON properties of a player object
 * @return {JSON} Returns JSON with all the properties of the newly created object, including its id
 *
 *     {
 *       "id": 9,
 *       "name": "Harper Lee",
 *       "weight": 190,
 *       "height": 72,
 *       "birthday": "1990-01-22",
 *       "profile": "Author of 'To Kill a Mockingbird'",
 *       "startRank": "novice"
 *     }
 *
 *  @signature `GET /services/templatesfilleds/:id`
 *	  Gets a player by id from the database.
 *
 *      GET /services/templatesfilleds/9
 *
 *  @return {JSON} An object that contains the player data:
 *
 *      {data: [{
 * 	      id: Int,
 * 	      name: String,		// TemplatesFilled name
 * 	      weight: Int,		// TemplatesFilled weight, in lbs
 * 	      height: Int,		// TemplatesFilled height, in inches
 * 	      birthday: Date 		// TemplatesFilled birthday
 * 	      profile: String 	// TemplatesFilled description/bio
 * 	      startRank: String	// Starting Rank
 *      }]}
 *
 * @signature `PUT /services/templatesfilleds/:id`
 *   Updates a player in the database. Only admins are allowed to update templatesfilleds.
 *
 *     PUT /services/templatesfilleds/9
 *         {
 *           "name": "Harper Lee",
 * 	         "weight": 190,
 * 		     "height": 72,
 * 	         "birthday": "1990-01-22",
 * 		     "profile": "Author of 'To Kill a Mockingbird' and `Absalom, Absalom`",
 * 		     "startRank": "novice"
 * 		   }
 *
 *  @param {JSON} JSONBody The updated properties of the player object
 *  @return {JSON} Returns JSON with all the properties of the updated object, including its id.
 *
 *      {
 *        "name": "Harper Lee",
 *        "weight": 190,
 *        "height": 72,
 *        "birthday": "1990-01-22",
 *        "profile": "Author of 'To Kill a Mockingbird' and `Absalom, Absalom`",
 *        "startRank": "novice"
 *      }
 *
 * @signature `DELETE /services/templatesfilleds/:id`
 *    Deletes a player in the database. Only admins are allowed to delete templatesfilleds.
 *
 *		DELETE /services/templatesfilleds/9
 *
 *  @return {JSON} Returns and empty JSON object.
 *
 *      {}
 */
var app = require("../services/app");
var TemplatesFilled = require("../models/templatesfilled");
var adminOnly = require( "./adminOnly" );

var clean = function(data){
	if(data.name===''){
		delete data.name;
	}
	if(data.weight) {
		data.weight = parseInt(data.weight, 10);
	}
	if(data.height) {
		data.height = parseInt(data.height, 10);
	}
	return data;
};

app.get('/services/templatesfilleds', function(req, res){
	TemplatesFilled.collection().query(req.query).fetch().then(function(templatesfilleds){
		res.send({data: templatesfilleds.toJSON()});
	});
});

app.get('/services/templatesfilleds/:id', function(req, res){
	new TemplatesFilled({id: req.params.id}).fetch().then(function(player){
		res.send(player.toJSON());
	});
});

app.put('/services/templatesfilleds/:id', adminOnly( "Must be an admin to update templatesfilleds" ), function(req, res){
	var cleaned = clean(req.body);
	new TemplatesFilled({id: req.params.id}).save(cleaned).then(function(player){
		res.send(player.toJSON());
	});
});

app['delete']('/services/templatesfilleds/:id', adminOnly( "Must be an admin to delete templatesfilleds" ), function(req, res){
	console.log("DESTROYING", req.params.id);
	new TemplatesFilled({id: req.params.id}).destroy().then(function(player){
		res.send({_destroyed: true});
	});
});

app.post('/services/templatesfilleds', adminOnly( "Must be an admin to create templatesfilleds" ), function(req, res) {
	new TemplatesFilled(clean(req.body)).save().then(function(player){
		res.send({id: player.get('id')});
	}, function(e){
		res.status(500).send(e);
	});
});

module.exports = TemplatesFilled;
