/**
 * @module {can-map} mosaico/models/tournament Tournament
 * @parent mosaico.clientModels
 *
 * @group mosaico/models/tournament.properties 0 properties
 */
var superMap = require('can-connect/can/super-map/');
var tag = require('can-connect/can/tag/');
var set = require("can-set");
var moment = require('moment');
var DefineMap = require("can-define/map/map");
var DefineList = require("can-define/list/list");


var Tournament = DefineMap.extend('Tournament', {
	/**
	 * @property {Number} mosaico/models/tournament.properties.id id
	 * @parent mosaico/models/tournament.properties
	 *
	 * A unique identifier.
	 **/
	id: 'number',
	/**
	 * @property {String} mosaico/models/tournament.properties.date date
	 * @parent mosaico/models/tournament.properties
	 *
	 * The date that the tournament is schedule to occur.
	 **/
	date: 'string',
	/**
	 * @property {Date} mosaico/models/tournament.properties.jsDate jsDate
	 * @parent mosaico/models/tournament.properties
	 *
	 * The [mosaico/models/tournament.properties.date] converted to a
	 * JavaScript Date object.
	 **/
	get jsDate() {
		var date = this.date;
		return date ? moment(date).toDate() : null;
	},
	/**
	 * @property {Date} mosaico/models/tournament.properties.year year
	 * @parent mosaico/models/tournament.properties
	 *
	 * The year referred to by [mosaico/models/tournament.properties.jsDate].
	 **/
	get year() {
		var jsDate = this.jsDate;
		return jsDate ? jsDate.getFullYear() : null;
	},
	/**
	 * @property {Date} mosaico/models/tournament.properties.prettyDate prettyDate
	 * @parent mosaico/models/tournament.properties
	 *
	 * A formatted output of [mosaico/models/tournament.properties.date].
	 **/
	get prettyDate() {
		var date = this.date;
		return date ? moment(date).toDate() : null;
	}
});

/**
 * @constructor {can-list} mosaico/models/tournament.static.List List
 * @parent mosaico/models/tournament.static
 */
Tournament.List = DefineList.extend('TournamentList', {"#": Tournament});

/**
 * @property {set.Algebra} mosaico/models/tournament.static.algebra algebra
 * @parent mosaico/models/tournament.static
 *
 * Set Algebra
 */
Tournament.algebra = new set.Algebra(
	new set.Translate("where","where"),
	set.comparators.sort('sortBy')
);

Tournament.connection = superMap({
  Map: Tournament,
  List: Tournament.List,
  url: {
		resource: "/services/tournaments",
		contentType: "application/x-www-form-urlencoded"
	},
  name: "tournament",
  algebra: Tournament.algebra
});

tag("tournament-model", Tournament.connection);

module.exports = Tournament;
