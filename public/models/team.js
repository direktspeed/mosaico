/**
 * @module {can-map} mosaico/models/team Team
 * @parent mosaico.clientModels
 *
 * @group mosaico/models/team.properties 0 properties
 */
var superMap = require('can-connect/can/super-map/');
var tag = require('can-connect/can/tag/');
var set = require("can-set");
var Player = require("./player");
var DefineMap = require("can-define/map/map");
var DefineList = require("can-define/list/list");

var Team = DefineMap.extend('Team', {
	/**
	 * @property {Array}
	 * A list of available team colors.
	 **/
	colors: ["Black","White","Red","Green","Blue","Yellow","Brown","Gray","Orange","Purple"]
},
{
	/**
	 * @property {Number} mosaico/models/team.properties.id id
	 * @parent mosaico/models/team.properties
	 *
	 * A unique identifier.
	 **/
	id: 'number',
	/**
	 * @property {Number} mosaico/models/team.properties.tournamentId tournamentId
	 * @parent mosaico/models/team.properties
	 *
	 * The `id` of [mosaico/models/tournament] that the team will be
	 * associated with.
	 **/
	tournamentId: "number",
	/**
	 * @property {mosaico/models/player} mosaico/models/team.properties.player1 player1
	 * @parent mosaico/models/team.properties
	 *
	 * A reference to a [mosaico/models/player] model.
	 **/
	player1: Player,
	/**
	 * @property {mosaico/models/player} mosaico/models/team.properties.player2 player2
	 * @parent mosaico/models/team.properties
	 *
	 * A reference to a [mosaico/models/player] model.
	 **/
	player2: Player,
	/**
	 * @property {mosaico/models/player} mosaico/models/team.properties.player3 player3
	 * @parent mosaico/models/team.properties
	 *
	 * A reference to a [mosaico/models/player] model.
	 **/
	player3: Player,
	/**
	 * @property {mosaico/models/player} mosaico/models/team.properties.player4 player4
	 * @parent mosaico/models/team.properties
	 *
	 * A reference to a [mosaico/models/player] model.
	 **/
	player4: Player,
	/**
	 * @property {String} mosaico/models/team.properties.name name
	 * @parent mosaico/models/team.properties
	 *
	 * Name of the team
	 **/
	name: 'string',
	/**
	 * @property {String} mosaico/models/team.properties.color color
	 * @parent mosaico/models/team.properties
	 *
	 * Team color
	 **/
	color: 'string',
	/**
	 * @property {Number} mosaico/models/team.properties.player1Id player1Id
	 * @parent mosaico/models/team.properties
	 *
	 * id of the player 1.
	 **/
	player1Id: 'number',
	/**
	 * @property {Number} mosaico/models/team.properties.player2Id player1Id
	 * @parent mosaico/models/team.properties
	 *
	 * id of the player 2.
	 **/
	player2Id: 'number',
	/**
	 * @property {Number} mosaico/models/team.properties.player3Id player1Id
	 * @parent mosaico/models/team.properties
	 *
	 * id of the player 3.
	 **/
	player3Id: 'number',
	/**
	 * @property {Number} mosaico/models/team.properties.player4Id player1Id
	 * @parent mosaico/models/team.properties
	 *
	 * id of the player 4.
	 **/
	player4Id: 'number',
	/**
	 * @property {mosaico/models/player.static.List} mosaico/models/team.properties.players players
	 * @parent mosaico/models/team.properties
	 *
	 * A list made up of the [mosaico/models/player] models referenced
	 * by properties [mosaico/models/team.properties.player1],
	 * [mosaico/models/team.properties.player2], [mosaico/models/team.properties.player3],
	 * and [mosaico/models/team.properties.player4].
	 **/
	get players() {
		var players = [],
			self = this;
			["player1","player2","player3","player4"].map(function(name){
			if(self[name]) {
				players.push(self[name]);
			}
		});
		return new Player.List(players);
	}
});
/**
 * @constructor {can-list} mosaico/models/team.static.List List
 * @parent mosaico/models/team.static
 */
Team.List = DefineList.extend('TeamsList',
/** @prototype **/
{
	"#": Team,
	/**
	 * @property {Object}
	 *
	 * A map of team ids to [mosaico/models/team] models.
	 **/
	get idMap() {
		var map = {};

		this.each(function(team){
			map[team.id] = team;
		});

		return map;
	},
	/**
	 * @function
	 *
	 * Iterates the list of the [mosaico/models/team] models and removes the
	 * [mosaico/models/team] with the specified `id`.
	 *
	 * @param {Number} id
	 **/
	removeById: function(id){
		var i  = 0;
		while(i < this.length) {
			if(this[i].id === id) {
				this.splice(i, 1);
			} else {
				i++;
			}
		}
	},
	/**
	 * @function
	 * Returns a Team in the list of teams given its id.
	 * @param {Number} id
	 * @return {mosaico/models/team|undefined} The team if it exists.
	 */
	getById: function(id){
		return this.idMap[id];
	}
});

/**
 * @property {set.Algebra} mosaico/models/team.static.algebra algebra
 * @parent mosaico/models/team.static
 *
 * Set Algebra
 */
Team.algebra = new set.Algebra(
	new set.Translate("where","where"),
	set.comparators.sort('sortBy')
);

var teamConnection = superMap({
  Map: Team,
  List: Team.List,
  url: {
		resource: "/services/teams",
		contentType: "application/x-www-form-urlencoded"
	},
  name: "team",
  algebra: Team.algebra
});

tag("team-model", teamConnection);

module.exports = Team;
