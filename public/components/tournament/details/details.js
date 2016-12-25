/**
 * @module {Module} mosaico/components/tournament/details <tournament-details>
 * @parent mosaico.components
 * @group mosaico/components/tournament/details.properties 0 properties
 *
 * @description Provides an overview of the games, teams, rounds, and courts
 * that make up a tournament.
 *
 * @signature `<tournament-details {is-admin} {tournament-id} />`
 *   Creates a game table organized by rounds/courts and a player table
 *   organized by teams.
 *
 *   @param {Boolean} is-admin Configures whether or not admin specific
 *   features are enabled.
 *
 *   @param {Number} tournament-id The id of the [mosaico/models/tournament]
 *   model that will be used.
 *
 * @body
 *
 * To create a `<tournament-details>` element pass the [mosaico/models/tournament] `id` like:
 *
 * ```
 * <tournament-details
 *     {tournament-id}="app.tournamentId" />
 * ```
 *
 * ## Example
 *
 * @demo public/components/tournament/details/details.html
 *
 */
var Component = require("can-component");
var Team = require("mosaico/models/team");
var Game = require("mosaico/models/game");
var Player = require("mosaico/models/player");
var Tournament = require("mosaico/models/tournament");
var Session = require("mosaico/models/session");
var DefineMap = require("can-define/map/map");

require("can-stream");
require("can-define-stream");
require("bootstrap/dist/css/bootstrap.css!");
require("can-stache/helpers/route");

exports.ViewModel = DefineMap.extend('TournamentDetails', {sealed: false},
{
	/**
	* @property {Promise<mosaico/models/tournament>} mosaico/components/tournament/details.tournamentPromise tournamentPromise
	* @parent mosaico/components/tournament/details.properties
	*
	* Configures whether or not admin specific features are enabled.
	**/
	get tournamentPromise() {
		return Tournament.get({id: this.tournamentId });
	},
	/**
	* @property {Boolean} mosaico/components/tournament/details.isAdmin isAdmin
	* @parent mosaico/components/tournament/details.properties
	*
	* Configures whether or not admin specific features are enabled.
	**/
	isAdmin: {
		type: 'boolean',
		value: false
	},
	/**
	* @property {Number} mosaico/components/tournament/details.tournamentId tournamentId
	* @parent mosaico/components/tournament/details.properties
	*
	* The `id` used to fetch the [mosaico/models/tournament] model.
	**/
	/**
	* @property {mosaico/models/tournament} mosaico/components/tournament/details.tournament tournament
	* @parent mosaico/components/tournament/details.properties
	*
	* The [mosaico/models/tournament] model that the component is bound to.
	**/
	tournament: {
		get: function(lastSet, setVal){
			this.tournamentPromise.then(setVal);
		}
	},
	/**
	* @property {Promise<mosaico/models/game.static.List>} mosaico/components/tournament/details.gamesPromise gamesPromise
	* @parent mosaico/components/tournament/details.properties
	*
	* A promise that fetches a [mosaico/models/game.static.List Game List] based on
	* [mosaico/components/tournament/details.ViewModel.prototype.tournamentId tournamentId].
	**/
	get gamesPromise() {
		return Game.getList({
			where: {tournamentId: this.tournamentId}
		});
	},
	/**
	* @property {mosaico/models/game.static.List} mosaico/components/tournament/details.games games
	* @parent mosaico/components/tournament/details.properties
	*
	* A [mosaico/models/game.static.List Game List] instance.
	**/
	games: {
		get: function(lastSet, setVal){
			this.gamesPromise.then(setVal);
		}
	},
	/**
	* @property {Number} mosaico/components/tournament/details.gamesLength gamesLength
	* @parent mosaico/components/tournament/details.properties
	*
	* The `length` of the [mosaico/components/tournament/details.ViewModel.prototype.games games]
	* list.
	**/
	get gamesLength() {
		return this.games ? this.games.length : 0;
	},
	/**
	* @property {Promise<mosaico/models/team.static.List>} mosaico/components/tournament/details.teamsPromise teamsPromise
	* @parent mosaico/components/tournament/details.properties
	*
	* A promise that resolves to a [mosaico/models/team.static.List Team List] based on
	* [mosaico/components/tournament/details.ViewModel.prototype.tournamentId tournamentId].
	**/
	get teamsPromise() {
		return Team.getList({
			where: {tournamentId: this.tournamentId}
		});
	},
	/**
	* @property {mosaico/models/team.static.List} mosaico/components/tournament/details.teams teams
	* @parent mosaico/components/tournament/details.properties
	*
	* A [mosaico/models/team.static.List Team List] instance.
	**/
	teams: {
		get: function(lastSet, setVal){
			this.teamsPromise.then(setVal);
		}
	},
	/**
	* @property {Array} mosaico/components/tournament/details.availableColors availableColors
	* @parent mosaico/components/tournament/details.properties
	*
	* A filtered list of colors from the [mosaico/models/team.static.colors Colors]
	* list that aren't already associated with a [mosaico/models/team]
	* model in the [mosaico/components/tournament/details.ViewModel.prototype.teams Teams] list.
	**/
	get availableColors() {
		var teams = this.teams;
		if(!teams) {
			return Team.colors;
		} else {
			var allColors = Team.colors.slice(0);
			teams.each(function(team){
				var index = allColors.indexOf(team.color);
				if(index !== -1) {
					allColors.splice(index, 1);
				}
			});
			return allColors;
		}
	},
	/**
	* @property {Array} mosaico/components/tournament/details.courtNames courtNames
	* @parent mosaico/components/tournament/details.properties
	* 
	* A list of courtNames from the [mosaico/models/game.static.courtNames courtNames]
	* list that are available.
	**/
	get courtNames() {
		return Game.courtNames;
	},
	/**
	* @property {mosaico/models/game} mosaico/components/tournament/details.game game
	* @parent mosaico/components/tournament/details.properties
	*
	* A [mosaico/models/game] instance used to create a `Game`.
	**/
	game: {
		Value: Game
	},
	/**
	* @property {mosaico/models/session} mosaico/components/tournament/details.session session
	* @parent mosaico/components/tournament/details.properties
	*
	* A [mosaico/models/session] instance used to track a `Session`
	**/
	session: Session,
	/**
	* @property {mosaico/models/team} mosaico/components/tournament/details.team team
	* @parent mosaico/components/tournament/details.properties
	*
	* A [mosaico/models/team] instance used to create a `Team`.
	**/
	team: {
		Value: Team
	},
	/**
	* @property {Promise<mosaico/models/player.static.List>} mosaico/components/tournament/details.playersPromise playersPromise
	* @parent mosaico/components/tournament/details.properties
	*
	* A promise that resolves to a [mosaico/models/player.static.List Team List].
	**/
	playersPromise: {
		value: function(){
			return Player.getList({orderBy: "name"});
		}
	},
	/**
	* @property {Player.List} mosaico/components/tournament/details.players players
	* @parent mosaico/components/tournament/details.properties
	*
	* A [mosaico/models/player.static.List Player List] instance.
	**/
	players: {
		get: function(set, resolve){
			this.playersPromise.then(resolve);
		}
	},
	/**
	* @property {String|null} mosaico/components/tournament/details.userSelectedRound userSelectedRound
	* @parent mosaico/components/tournament/details.properties
	*
	* The round selection made by the user.
	**/
	userSelectedRound: {
		value: null
	},
	/**
	* @property {String} mosaico/components/tournament/details.selectedRound selectedRound
	* @parent mosaico/components/tournament/details.properties
	*
	* The [mosaico/components/tournament/details.ViewModel.prototype.userSelectedRound userSelectedRound]
	* or the first value in the list returned from [mosaico/models/game.static.List.prototype.getAvailableRounds getAvailableRounds].
	**/
	selectedRound: {
		type: 'string',
		stream: function(setStream) {
			var firstAvailableRoundStream = this.stream('.firstAvailableRound');
			return setStream.merge(firstAvailableRoundStream);
		}
	},
	get firstAvailableRound() {
		var availableRounds = this.games && this.games.getAvailableRounds()[0];
		return availableRounds;
	},
	/**
	* @property {String|null} mosaico/components/tournament/details.userSelectedCourt userSelectedCourt
	* @parent mosaico/components/tournament/details.properties
	*
	* The court selection made by the user.
	**/
	userSelectedCourt: {
		value: null
	},
	/**
	* @property {String} mosaico/components/tournament/details.selectedCourt selectedCourt
	* @parent mosaico/components/tournament/details.properties
	*
	* The [mosaico/components/tournament/details.ViewModel.prototype.userSelectedCourt userSelectedCourt]
	* or the first value in the list returned from [mosaico/models/game.static.List.prototype.getAvailableCourts getAvailableCourts]
	* given the [mosaico/components/tournament/details.ViewModel.prototype.selectedRound selectedRound].
	**/
	selectedCourt: {
		type: 'string',
		stream: function(setStream) {
			var vm = this;
			var selectedRoundStream = this.stream(".selectedRound");

			return setStream.merge(selectedRoundStream).map(function(val) {
				if(vm.games) {
					var selectedCourt = vm.games && vm.games.getAvailableCourts(vm.selectedRound);
					if(selectedCourt[val]) {
						return selectedCourt[val];
					}
					return selectedCourt[0]; //Reset it to the first court available.
				}
				return val;
			});
		}
	},
	/**
	* @property {Object} mosaico/components/tournament/details.teamIdMap teamIdMap
	* @parent mosaico/components/tournament/details.properties
	*
	* A map of [mosaico/models/team.prototype.id team id]'s to [mosaico/models/team] models.
	**/
	get teamIdMap() {
		var map = {};
		var teams = this.teams;
		if(teams) {
			teams.each(function(team){
				map[team.id] = team;
			});
		}

		return map;
	},
	/**
	 * @function availableTeamFor
	 *
	 * Filters the [mosaico/components/tournament/details.ViewModel.prototype.teams teams] list
	 * to exclude teams that are already assigned to a [mosaico/models/game].
	 *
	 * @param {String} name "home" or "away".
	 * @param {String} round  A round name from [mosaico/models/game.static.roundNames roundNames].
	 *
	 * @return {mosaico/models/team.static.List|Array} An array of [mosaico/models/team] models.
	 **/
	// TODO: Make into a Team.List helper
	availableTeamFor: function(name, round){
		var teams = this.teams;
		var games = this.games;
		if(!games || !teams) {
			return [];
		}

		if(!round) {
			return teams;
		}
		
		var remainingTeams = teams.slice(0);

		games.forEach(function(game){
			// TODO: Get a reference to the games in this round more quickly
			// using `gamesGroupedByRound` instead of iterating
			if(game.round === round) {
				remainingTeams.removeById(game.homeTeamId);
				remainingTeams.removeById(game.awayTeamId);
			}
		});

		var opposite = name === "home" ? "away" : "home",
			oppositeId = this.game[opposite+"TeamId"];

		if(oppositeId) {
			remainingTeams.removeById(oppositeId);
		}
		return remainingTeams;
	},
	/**
	 * Filters the [mosaico/components/tournament/details.ViewModel.prototype.players players] list
	 * to exclude players that are already assigned to a [mosaico/models/team].
	 *
	 * @param {String} team A reference to a [mosaico/models/team] model instance.
	 * @param {Number} number The player number on the team.
	 *
	 * @return {mosaico/models/player.static.List|Array} An array of [mosaico/models/team] models.
	 **/
	availablePlayersFor: function(team, number){

		var allPlayers = this.players,
			teams = this.teams;
		if(allPlayers && teams) {
			var usedIds = {};

			teams.each(function(tm){
				if(tm !== team) {
					[1,2,3,4].forEach(function(index){
						usedIds[tm["player"+index+"Id"]] = true;
					});
				}
			});


			[1,2,3,4].forEach(function(index){
				if(index !== number) {
					usedIds[team["player"+index+"Id"]] = true;
				}
			});
			return allPlayers.filter(function(player){
				return !usedIds[player.id];
			});
		} else {
			return [];
		}
	},
	/**
	 * Sets properties on the [mosaico/components/tournament/details.ViewModel.prototype.team team]
	 * model then persists it to the server. Once the "save" request resolves a new [mosaico/models/team] instance
	 * is created and assigned to [mosaico/components/tournament/details.ViewModel.prototype.team team].
	 *
	 * @param {Event} [ev] A DOM Level 2 event that [`preventDefault`](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault)
	 * will be called on.
	 **/
	createTeam: function(ev){
		if (ev) {
			ev.preventDefault();
		}
		var self = this;
		if(!this.team.color){
			this.team.color = this.availableColors[0];
		}
		this.team.tournamentId = this.tournamentId;

		this.teamSavePromise = this.team.save(function(){
			self.team = new Team();
		});

	},
	/**
	 * Sets properties on the [mosaico/components/tournament/details.ViewModel.prototype.game game]
	 * model then persists it to the server. Once the "save" request resolves a new [mosaico/models/game] instance
	 * is created and assigned to [mosaico/components/tournament/details.ViewModel.prototype.game game].
	 *
	 * @param {Event} [ev] A DOM Level 2 event that [`preventDefault`](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault)
	 * will be called on.
	 **/
	createGame: function(ev) {

		ev.preventDefault();

		var self = this;
		var game = this.game;

		game.set({
			round: this.selectedRound,
			court: this.selectedCourt,
			tournamentId: this.tournamentId
		});
		
		game.save(function(){
			self.game = new Game();
		});

	},

	/**
	 * @function
	 * @description Delete a game from the database.
	 * @param {mosaico/models/game} game The [mosaico/models/game] to delete.
	 *
	 * @body
	 *
	 * Use in a template like:
	 * ```
	 * <span class="destroy-btn" ($click)="deleteGame(.)"></span>
	 * ```
	 */
	deleteGame: function (game) {
		if (! window.confirm('Are you sure you want to delete this game?')) {
			return;
		}
		game.destroy();
	},

	/**
	 * @function
	 * @description Delete a team from the database.
	 * @param {mosaico/models/team} team The [mosaico/models/team] to delete.
	 *
	 * @body
	 *
	 * Use in a template like:
	 * ```
	 * <span class="destroy-btn" ($click)="deleteTeam(.)"></span>
	 * ```
	 */
	deleteTeam: function (team) {
		if (! window.confirm('Are you sure you want to delete this team?')) {
			return;
		}
		team.destroy();
	}
});

exports.Component = Component.extend({
	tag: "tournament-details",
	view: require("./details.stache!"),
	ViewModel: exports.ViewModel
});
