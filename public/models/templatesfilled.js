/**
 * @module {can-map} mosaico/models/templatesfilled TemplatesFilled
 * @parent mosaico.clientModels
 *
 * @group mosaico/models/templatesfilled.properties 0 properties
 */
var superMap = require('can-connect/can/super-map/');
var tag = require('can-connect/can/tag/');
var moment = require("moment");
var set = require("can-set");
var DefineList = require('can-define/list/list');
var DefineMap = require('can-define-backup');



var TemplatesFilled = DefineMap.extend('TemplatesFilled', {
	/**
	 * @property {Number} mosaico/models/templatesfilled.properties.id id
	 * @parent mosaico/models/templatesfilled.properties
	 *
	 * A unique identifier.
	 **/
	id: 'number',
	/**
	 * @property {String} mosaico/models/templatesfilled.properties.birthday birthday
	 * @parent mosaico/models/templatesfilled.properties
	 *
	 * The templatesfilled's date of birth. Formatted as `YYYY-MM-DD`.
	 **/
	birthday: 'any',
	/**
	 * @property {String} mosaico/models/templatesfilled.properties.name name
	 * @parent mosaico/models/templatesfilled.properties
	 *
	 * The name of the templatesfilled.
	 **/
	name: 'string',
	/**
	 * @property {Number} mosaico/models/templatesfilled.properties.weight weight
	 * @parent mosaico/models/templatesfilled.properties
	 *
	 * The weight of a templatesfilled in pounds.
	 **/
	weight: 'number',
	/**
	 * @property {Number} mosaico/models/templatesfilled.properties.height height
	 * @parent mosaico/models/templatesfilled.properties
	 *
	 * The height of a templatesfilled in inches.
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
	 * @property {Date|null} mosaico/models/templatesfilled.properties.jsBirthday jsBirthday
	 * @parent mosaico/models/templatesfilled.properties
	 *
	 * The [mosaico/models/templatesfilled.properties.birthday birthday] property
	 * represented as a JavaScript object.
	 **/
	get jsBirthday() {
		var date = this.birthday;
		return date ? new Date(date) : null;
	},
	/**
	 * @property {String} mosaico/models/templatesfilled.properties.birthDate birthDate
	 * @parent mosaico/models/templatesfilled.properties
	 *
	 * The [mosaico/models/templatesfilled.properties.birthday birthday] property
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
	 * @property {Number} mosaico/models/templatesfilled.properties.age age
	 * @parent mosaico/models/templatesfilled.properties
	 *
	 * The number of full years since the date of the
	 * [mosaico/models/templatesfilled.properties.jsBirthday jsBirthday] property.
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
 * @constructor {can-list} mosaico/models/templatesfilled.static.List List
 * @parent mosaico/models/templatesfilled.static
 */
TemplatesFilled.List = DefineList.extend('TemplatesFilledList',
/** @prototype **/
{
	"#": TemplatesFilled,
	/**
	 * @property {Object}
	 *
	 * A map of templatesfilled ids to [mosaico/models/templatesfilled] models.
	 **/
	get idMap() {
		var map = {};
		this.each(function(templatesfilled){
			map[templatesfilled.id] = templatesfilled;
		});

		return map;
	},

	/**
	 * @function
	 *
	 * Returns a TemplatesFilled in the list of templatesfilleds given its id.
	 *
	 * @param {Number} id
	 * @return {mosaico/models/templatesfilled|undefined} The templatesfilled if it exists.
	 */
	getById: function(id){
		return this.idMap[id];
	}
});

/**
 * @property {set.Algebra} mosaico/models/templatesfilled.static.algebra algebra
 * @parent mosaico/models/templatesfilled.static
 *
 * Set Algebra
 */
TemplatesFilled.algebra = new set.Algebra(
	new set.Translate("where","where"),
	set.comparators.sort('orderBy')
);

TemplatesFilled.connection = superMap({
  Map: TemplatesFilled,
  List: TemplatesFilled.List,
  url: {
	resource: "/services/templatesfilleds",
	contentType: 'application/x-www-form-urlencoded'
  },
  name: "templatesfilled",
  algebra: TemplatesFilled.algebra
});

tag("templatesfilled-model", TemplatesFilled.connection);

module.exports = TemplatesFilled;
