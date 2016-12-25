/**
 * @module {Module} mosaico/components/player/list <player-list>
 * @parent mosaico.components
 *
 * @group mosaico/components/player/list.properties 0 properties
 *
 * @description Provides links to the existing [mosaico/models/player]s. Enables logged
 * in admin users to create, update, and destroy [mosaico/models/player]s.
 *
 * @signature `<player-list {is-admin} />`
 *   Renders a list of [mosaico/models/player] models.
 *
 *   @param {Boolean} is-admin Configures whether or not admin specific
 *   features are enabled.
 *
 *
 * @body
 *
 * To create a `<player-list>` element pass a boolean like [mosaico/app.prototype.isAdmin]:
 *
 * ```
 * <player-list
 *     {is-admin}="app.isAdmin" />
 * ```
 *
 * ## Example
 *
 * @demo public/components/player/list/list.html
 *
 **/
var Component = require("can-component");
var template = require("./list.stache!");
var DefineMap = require("can-define/map/");

require("bootstrap/dist/css/bootstrap.css!");
require("can-route");

var Player = require("mosaico/models/player");

var ViewModel = exports.ViewModel = DefineMap.extend('PlayerListVM',
{
	/**
	 * @property {Boolean} mosaico/components/player/list.isAdmin isAdmin
	 * @parent mosaico/components/player/list.properties
	 *
	 * Configures whether or not admin specific features are enabled.
	 **/
	isAdmin: {
		type: 'boolean',
		value: false
	},
	/**
	 * @property {mosaico/models/Player} mosaico/models/player editingPlayer
	 * 
	 * holds the current player instance that is being edited
	 */
	editingPlayer: Player,
	/**
	 * @property {Promise<mosaico/models/player>} mosaico/components/player/list.playersPromise playersPromise
	 * @parent mosaico/components/player/list.properties
	 *
	 * A [mosaico/models/player] model List.
	 */
	playersPromise: {
		value: function(){
			return Player.getList({orderBy: "name"});
		}
	},
	/**
	 * @function editPlayer
	 *
	 * Selects a [mosaico/models/player] model for editing.
	 *
	 * @param {mosaico/models/player} player
	 *   The player model that will be passed to the `<player-edit>`
	 *   component.
	 */
	editPlayer: function(player){
		player.backup();
		this.editingPlayer = player;
	},
	/**
	 * @function removeEdit
	 *
	 * Deselects the [mosaico/models/player] model being edited.
	 */
	removeEdit: function(){
		this.editingPlayer = null;
	},
	/**
	 * @function
	 * @description Delete a player from the database.
	 * @param {mosaico/models/player} player The [mosaico/models/player] to delete.
	 *
	 * @body
	 *
	 * Use in a template like:
	 * ```
	 * <span class="destroy-btn" ($click)="deletePlayer(.)"></span>
	 * ```
	 */
	deletePlayer: function (player) {
		if (! window.confirm('Are you sure you want to delete this player?')) {
			return;
		}
		player.destroy();
	}
});

exports.Component = Component.extend({
	tag: "player-list",
	view: template,
	ViewModel: ViewModel
});
