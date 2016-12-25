/**
 * @module {can-map} mosaico/models/player Player
 * @parent mosaico.clientModels
 *
 * @group mosaico/models/player.properties 0 properties
 */
var superMap = require('can-connect/can/super-map/');
var tag = require('can-connect/can/tag/');
var moment = require("moment");
var set = require("can-set");
var DefineList = require('can-define/list/list');
var DefineMap = require('can-define-backup');



var Player = DefineMap.extend('Player', {
	/**
	 * @property {Number} mosaico/models/player.properties.id id
	 * @parent mosaico/models/player.properties
	 *
	 * A unique identifier.
	 **/
	id: 'number',
	/**
	 * @property {String} mosaico/models/player.properties.birthday birthday
	 * @parent mosaico/models/player.properties
	 *
	 * The player's date of birth. Formatted as `YYYY-MM-DD`.
	 **/
	birthday: 'any',
	/**
	 * @property {String} mosaico/models/player.properties.name name
	 * @parent mosaico/models/player.properties
	 *
	 * The name of the player.
	 **/
	name: 'string',
	/**
	 * @property {Number} mosaico/models/player.properties.weight weight
	 * @parent mosaico/models/player.properties
	 *
	 * The weight of a player in pounds.
	 **/
	weight: 'number',
	/**
	 * @property {Number} mosaico/models/player.properties.height height
	 * @parent mosaico/models/player.properties
	 *
	 * The height of a player in inches.
	 **/
	height: 'number',
	/**
	 * @function
	 *
	 * Backs up the model's properties on instantiation.
	 **/
	init: function () {
		this.backup();
	},
	/**
	 * @property {Date|null} mosaico/models/player.properties.jsBirthday jsBirthday
	 * @parent mosaico/models/player.properties
	 *
	 * The [mosaico/models/player.properties.birthday birthday] property
	 * represented as a JavaScript object.
	 **/
	get jsBirthday() {
		var date = this.birthday;
		return date ? new Date(date) : null;
	},
	/**
	 * @property {String} mosaico/models/player.properties.birthDate birthDate
	 * @parent mosaico/models/player.properties
	 *
	 * The [mosaico/models/player.properties.birthday birthday] property
	 * formatted as `YYYY-MM-DD`.
	 **/
	get birthDate() {
		var date = this.birthday;
		return date ? moment(date).format('YYYY-MM-DD') : "";
	},
	set birthDate(value) {
		this.birthday = value;
	},
	/**
	 * @property {Number} mosaico/models/player.properties.age age
	 * @parent mosaico/models/player.properties
	 *
	 * The number of full years since the date of the
	 * [mosaico/models/player.properties.jsBirthday jsBirthday] property.
	 **/
	get age() {
		var birthDate = this.jsBirthday;
		if(birthDate) {
			var today = new Date();
			var age = today.getFullYear() - birthDate.getFullYear();
			var m = today.getMonth() - birthDate.getMonth();
			if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
				age--;
			}
			return age;
		}
	}
});

/**
 * @constructor {can-list} mosaico/models/player.static.List List
 * @parent mosaico/models/player.static
 */
Player.List = DefineList.extend('PlayerList',
/** @prototype **/
{
	"#": Player,
	/**
	 * @property {Object}
	 *
	 * A map of player ids to [mosaico/models/player] models.
	 **/
	get idMap() {
		var map = {};
		this.each(function(player){
			map[player.id] = player;
		});

		return map;
	},

	/**
	 * @function
	 *
	 * Returns a Player in the list of players given its id.
	 *
	 * @param {Number} id
	 * @return {mosaico/models/player|undefined} The player if it exists.
	 */
	getById: function(id){
		return this.idMap[id];
	}
});

/**
 * @property {set.Algebra} mosaico/models/player.static.algebra algebra
 * @parent mosaico/models/player.static
 *
 * Set Algebra
 */
Player.algebra = new set.Algebra(
	new set.Translate("where","where"),
	set.comparators.sort('orderBy')
);

Player.connection = superMap({
  Map: Player,
  List: Player.List,
  url: {
	resource: "/services/players",
	contentType: 'application/x-www-form-urlencoded'
  },
  name: "player",
  algebra: Player.algebra
});

tag("player-model", Player.connection);

module.exports = Player;
