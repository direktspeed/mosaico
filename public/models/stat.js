/**
 * @module {can-map} mosaico/models/stat Stat
 * @parent mosaico.clientModels
 *
 * @group mosaico/models/stat.properties 0 properties
 *
 * A [can.Map](https://canjs.com/docs/can.Map.html) that's connected to the [services/stats] with
 * all of [can-connect/can/super-map](https://connect.canjs.com/doc/can-connect%7Ccan%7Csuper-map.html)'s
 * behaviors.
 *
 * @body
 *
 * ## Use
 *
 * Use the `Stat` model to CRUD stats on the server. Use the CRUD methods `getList`, `save`, and `destroy` added to
 * `Stat` by the [can-connect/can/map](https://connect.canjs.com/doc/can-connect%7Ccan%7Cmap.html) behavior.
 *
 *
 * ```
 * var Stat = require("mosaico/models/stat");
 * Stat.getList({where: {gameId: 5}}).then(function(stats){ ... });
 * new Stat({gameId: 6, playerId: 15, type: "1P", time: 60}).save()
 * ```
 */
var superMap = require('can-connect/can/super-map/'),
	tag = require('can-connect/can/tag/'),
	set = require("can-set");
var DefineMap = require('can-define/map/map');
var DefineList = require('can-define/list/list');
var Player = require("mosaico/models/player");

require("can-define-backup");

var Stat = DefineMap.extend('Stat',
{
	/**
	 * @property {Array<{name: String}>} statTypes
	 *
	 * Array of statType objects.  Each object has a name property which
	 * has the short name of the stat.  Ex: `{name: "1P"}`.
	 */
	statTypes: [
			{ name: "1P"},
			{ name: "1PA"},
			{ name: "2P"},
			{ name: "2PA"},
			{ name: "ORB"},
			{ name: "DRB"},
			{ name: "Ast"},
			{ name: "Stl"},
			{ name: "Blk"},
			{ name: "To"}
		]
},
{
	/**
	 * @property {Number} mosaico/models/stat.properties.id id
	 * @parent mosaico/models/stat.properties
	 * A unique identifier.
	 **/
	id: 'number',
	/**
	 * @property {mosaico/models/player} mosaico/models/stat.properties.player player
	 * @parent mosaico/models/player.properties
	 *
	 * Player related to the stats
	 */
	player: {
		Type: Player,
		serialize: false
	},
	/**
	 * @property {Number} mosaico/models/stat.properties.playerId playerId
	 * @parent mosaico/models/player.properties
	 *
	 * Player id of the current stats
	 */
	playerId: 'number',
	/**
	 * @property {Number} mosaico/models/stat.properties.gameId gameId
	 * @parent mosaico/models/player.properties
	 *
	 * Game id of the current stat
	 */
	gameId: 'number',
	/**
	 * @property {Any} mosaico/models/stat.properties.type type
	 * @parent mosaico/models/player.properties
	 *
	 * Type of the stat
	 */
	type: 'any',
	/**
	 * @property {Number} mosaico/models/stat.properties.time time
	 * @parent mosaico/models/stat.properties
	 *
	 * The time of the stat, rounded to the nearest integer.
	 */
	time: {
		set: function(newVal){
			return Math.round(newVal);
		}
	}
});


/**
 * @property {can-define/list} mosaico/models/stat.static.List List
 * @parent mosaico/models/stat.static
 *
 * Methods on a List of stats.
 */
Stat.List = DefineList.extend('StatsList', {"#": Stat});

/**
 * @property {set.Algebra} mosaico/models/stat.static.algebra algebra
 * @parent mosaico/models/stat.static
 *
 * Set Algebra
 */
Stat.algebra = new set.Algebra(
	new set.Translate("where","where"),
	set.comparators.sort('sortBy')
);

Stat.connection = superMap({
	idProp: "id",
	Map: Stat,
	List: Stat.List,
	url: {
		getData: "/services/stats",
		createData: "/services/stats",
		destroyData: "/services/stats/{id}",
		contentType: "application/x-www-form-urlencoded"
	},
	name: "stat",
	algebra: Stat.algebra
});

tag("stat-model", Stat.connection);

module.exports = Stat;
