/**
 * @module {Module} mosaico/components/tournament/list <tournament-list>
 * @parent mosaico.components
 *
 * @group mosaico/components/tournament/list.properties 0 properties
 *
 * @description Provides links to the existing tournaments. Enables logged
 * in admin users to create and destroy tournaments.
 *
 * @signature `<tournament-list {is-admin}/>`
 *   Renders a list of tournaments.
 *
 *   @param {Boolean} is-admin Configures whether or not admin specific
 *   features are enabled.
 *
 *
 * @body
 *
 * To create a `<tournament-list>` element pass a boolean like [mosaico/app.prototype.isAdmin]:
 *
 * ```
 * <tournament-list
 *     {is-admin}="app.isAdmin" />
 * ```
 *
 * ## Example
 *
 * @demo public/components/tournament/list/list.html
 *
 */
var Component = require("can-component");
var DefineMap = require("can-define/map/map");
var Tournament = require("mosaico/models/tournament");

require("bootstrap/dist/css/bootstrap.css!");
require("can-stache/helpers/route");

exports.ViewModel = DefineMap.extend('TournamentList',
/** @prototype */
{

	/**
	* @property {mosaico/models/tournament} mosaico/components/tournament/list.tournament tournament
	* @parent mosaico/components/tournament/list.properties
	*
	* The [mosaico/models/tournament] model that backs the tournament
	* creation form.
	**/
	tournament: {
		Type: Tournament,
		Value: Tournament
	},
	/**
	* @property {Boolean} mosaico/components/tournament/list.isAdmin isAdmin
	* @parent mosaico/components/tournament/list.properties
	*
	* Configures whether or not admin specific features are enabled.
	**/
	isAdmin: {
		type: 'boolean',
		value: false,
	},
	/**
	* @property {Promise<Tournament>} mosaico/components/tournament/list.savePromise savePromise
	* @parent mosaico/components/tournament/list.properties
	*
	* A promise that resolves when [mosaico/component/tournament/list.prototype.createTournament]
	* is called and the [mosaico/models/tournament] model is persisted to the server.
	**/
	savePromise: 'any',
	/**
	 * @function createTournament
	 *
	 * @description Creates the tournament on the server and when successful sets
	 * [mosaico/components/tournament/list.tournament] to a new [mosaico/models/tournament] model.
	 *
	 * @param {Event} [ev] A DOM Level 2 event.
     *
	 * @return {Promise<Tournament>} A [mosaico/models/tournament] model.
	 */
	createTournament: function(ev) {
		if (ev) {
			ev.preventDefault();
		}
		var self = this;

		var promise = this.tournament.save().then(function(player) {
			self.tournament = new Tournament();
		});
		
		this.savePromise = promise;
		return promise;
	},
	/**
	 * @function
	 * @description Delete a tournament from the database.
	 * @param {mosaico/models/tournament} tournament The [mosaico/models/tournament] to delete.
	 *
	 * @body
	 *
	 * Use in a template like:
	 * ```
	 * <span class="destroy-btn" ($click)="deleteTournament(.)"></span>
	 * ```
	 */
	deleteTournament: function (tournament) {
		if (! window.confirm('Are you sure you want to delete this tournament?')) {
			return;
		}
		tournament.destroy();
	}
});

exports.Component = Component.extend({
	tag: "tournament-list",
	view: require("./list.stache!"),
	ViewModel: exports.ViewModel,
	leakScope: false
});