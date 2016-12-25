/**
 * @module {can-map} mosaico/models/game Game
 * @parent mosaico.clientModels
 *
 * @group mosaico/models/game.properties 0 properties
 */
var superMap = require('can-connect/can/super-map/');
var set = require("can-set");
var tag = require('can-connect/can/tag/');
var Team = require("mosaico/models/team");
var Player = require("mosaico/models/player");
var Stat = require("mosaico/models/stat");
var Tournament = require("./tournament");
var DefineMap = require("can-define/map/map");
var DefineList = require("can-define/list/list");
var can = require("can-util");


var Game = DefineMap.extend('Game',
{
	/**
	 * @property {Array<String>}
	 * A sorted array of possible court names.
	 */
	courtNames: ["1", "2", "3", "4"],
	/**
	 * @property {Array<String>}
	 * A sorted array of possible round names.
	 */
	roundNames: ["Round 1", "Round 2", "Round 3", "Round 4", "Round 5",
		"Elimination", "Quarter Finals", "Semi Finals", "Championship"]
},
{
	/**
	 * @property {Number} mosaico/models/game.properties.id id
	 * @parent mosaico/models/game.properties
	 * A unique identifier.
	 **/
	id: 'number',
	/**
	 * @property {Number} mosaico/models/game.properties.tournamentId tournamentId
	 * @parent mosaico/models/game.properties
	 * The tournament's id the game belongs to.
	 */
	tournamentId: "number",
	/**
	 * @property {mosaico/models/tournament} mosaico/models/game.properties.tournament tournament
	 * @parent mosaico/models/game.properties
	 * The tournament the game belongs to.  This can be loaded with `withRelated[]=tournament`.
	 */
	tournament: Tournament,
	/**
	 * @property {Number} mosaico/models/game.properties.homeTeamId homeTeamId
	 * @parent mosaico/models/game.properties
	 * The home team's id.
	 */
	homeTeamId: "number",
	/**
	 * @property {Number} mosaico/models/game.properties.awayTeamId awayTeamId
	 * @parent mosaico/models/game.properties
	 * The away team's id.
	 */
	awayTeamId: "number",
	/**
	 * @property {mosaico/models/team} mosaico/models/game.properties.homeTeam homeTeam
	 * @parent mosaico/models/game.properties
	 * The home team. This can be loaded with `withRelated[]=homeTeam`.
	 */
	homeTeam: Team,
	/**
	 * @property {mosaico/models/team} mosaico/models/game.properties.awayTeam awayTeam
	 * @parent mosaico/models/game.properties
	 * The away team. This can be loaded with `withRelated[]=awayTeam`.
	 */
	awayTeam: Team,
	/**
	 * @property {String} mosaico/models/game.properties.round round
	 * @parent mosaico/models/game.properties
	 *
	 * The game round value
	 */
	round: 'string',
	/**
	 * @property {String} mosaico/models/game.properties.court court
	 * @parent mosaico/models/game.properties
	 *
	 * The game court value
	 */
	court: 'string',
	/**
	 * @property {mosaico/models/team.static.List} mosaico/models/game.properties.teams teams
	 * @parent mosaico/models/game.properties
	 * A list that contains the home and away team.
	 */
	get teams() {
		var teams = [],
			home = this.homeTeam,
			away = this.awayTeam;

		if(home) {
			teams.push(home);
		}
		if(away) {
			teams.push(away);
		}
		return new Team.List(teams);
	},
	/**
	 * @property {mosaico/models/player.static.List} mosaico/models/game.properties.players players
	 * @parent mosaico/models/game.properties
	 * A list that contains all [mosaico/models/player] models for this game.
	 */
	get players() {
		var players = [];
		this.teams.forEach(function(team){
			[].push.apply(players, can.makeArray( team.players ) );
		});
		return new Player.List(players);
	},
	/**
	 * @property {mosaico/models/stat.static.List} mosaico/models/game.properties.stats stats
	 * @parent mosaico/models/game.properties
	 * The stats for this game. This can be loaded with `withRelated[]=stats`.
	 */
	stats: {
		Type: Stat.List,
		set: function(stats){
			stats.__listSet = {where: {gameId: this.id }};
			return stats;
		}
	},
	/**
	 * @property {String} mosaico/models/game.properties.videoUrl videoUrl
	 * @parent mosaico/models/game.properties
	 * The videoUrl code for the game.  When set to an actual URL, it will
	 * extract the youtube code from the url.
	 */
	videoUrl: {
		set: function (setVal) {
			var youtubeKeySearchPattern =
				/^.*(?:youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/;
			var keys = setVal && setVal.match(youtubeKeySearchPattern);

			// Use the found video key; Fallback to the raw input
			var videoUrl = (keys && keys.length > 1 && keys[1]) || setVal;
			return videoUrl;
		}
	},
	/**
	 * @function
	 **/
	statsForPlayerId: function(id) {
		return this.stats.filter(function(stat){
			return stat.playerId === id;
		});
	},
	/**
	 * @function
	 **/
	sortedStatsByPlayerId: function(){
		if(this.stats) {
			var playerIds = {};
			this.stats.forEach(function(stat){
				var id = stat.playerId;
				var stats = playerIds[id];
				if(!stats) {
					stats = new DefineList();
					stats.comparator = 'time';
					playerIds[id] = stats;
				}
				// makes sort work
				stats.push(stat);
			});
			return playerIds;
		}
	}
});

/**
 * @constructor {can-list} mosaico/models/game.static.List List
 * @parent mosaico/models/game.static
 *
 * @group mosaico/models/game.static.List.properties 0 properties
 */
Game.List = DefineList.extend('GamesList',
{
	"#": Game,
	/**
	 * @property {Object<roundName,Object<courtName,mosaico/models/game>>} mosaico/models/game.static.List.properties.gamesGroupedByRound gamesGroupedByRound
	 * @parent mosaico/models/game.static.List.properties
	 *
	 * An object that maps round names to court names to [mosaico/models/game] models.
	 */
	get gamesGroupedByRound() {
		var rounds = {};
		this.forEach(function (game) {
			var roundName = game.round;
			var courtName = game.court;

			// Get, or define the Round pseudo-model
			rounds[roundName] = rounds[roundName] || {
				_count: 0
			};

			// Store the game and increment the count
			rounds[roundName][courtName] = game;
			rounds[roundName]._count++;
		});

		return rounds;
	},
	/**
	 * @function
	 *
	 * Reads from the `_count` property for the given `roundName` in
	 * [mosaico/models/game.static.List.properties.gamesGroupedByRound].
	 *
	 * @param {String} roundName
	 * @return {Array<String>}
	 */
	getGameCountForRound: function (roundName) {
		var gamesGroupedByRound = this.gamesGroupedByRound,
			round = gamesGroupedByRound[roundName];
		return round ? round._count : 0;
	},
	/**
	 * @function
	 *
	 * Returns a sorted array of rounds that don't reference a [mosaico/models/game]
	 * in [mosaico/models/game.static.List.properties.gamesGroupedByRound].
	 *
	 * @return {Array<Object>}
	 */
	getAvailableRounds: function() {
		return Game.roundNames.filter(function (roundName) {
			return this.getGameCountForRound(roundName) < Game.courtNames.length;
		}, this);
	},
	/**
	 * @function
	 *
	 * Returns a sorted array of rounds that reference at least one [mosaico/models/game]
	 * in [mosaico/models/game.static.List.properties.gamesGroupedByRound].
	 *
	 * @return {Array<Object>}
	 **/
	getRoundsWithGames: function() {
		var rounds = Game.roundNames.filter(function (roundName) {
			return this.getGameCountForRound(roundName) > 0;
		}, this);
		return rounds;
	},
	/**
	 * @function
	 * Returns a sorted array of courts in [mosaico/models/game.static.List.properties.gamesGroupedByRound]
	 * that don't reference a [mosaico/models/game] for the given `roundName`.
	 * @param {String} roundName
	 * @return {Array<Object>}
	 */
	getAvailableCourts: function(roundName) {
		return Game.courtNames.filter(function (courtName) {
			return !this.getGameForRoundAndCourt(roundName, courtName);
		}, this);
	},
	/**
	 * @function
	 *
	 * Gets a reference to a [mosaico/models/game] in [mosaico/models/game.static.List.properties.gamesGroupedByRound]
	 * using the provided `roundName` and `courtName`.
	 *
	 * @param {String} roundName
	 * @param {String} courtName
	 *
	 * @return {mosaico/models/game}
	 */
	getGameForRoundAndCourt: function(roundName, courtName) {
		var gamesGroupedByRound = this.gamesGroupedByRound,
			round = gamesGroupedByRound[roundName];
		return round && round[courtName];
	}
});

/**
 * @property {set.Algebra} mosaico/models/game.static.algebra algebra
 * @parent mosaico/models/game.static
 *
 * Set Algebra
 */
Game.algebra = new set.Algebra(
	new set.Translate("where","where"),
	set.comparators.sort('sortBy')
);

Game.connection = superMap({
  Map: Game,
  List: Game.List,
  url: {
		resource: "/services/games",
		contentType: "application/x-www-form-urlencoded"
	},
  name: "game",
  algebra: Game.algebra,
});

tag("game-model", Game.connection);

module.exports = Game;
