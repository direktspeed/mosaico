var bookshelf = require("./bookshelf"),
	checkit = require("checkit");

/**
 * @module {bookshelf.Model} models/templatesfilled TemplatesFilled
 * @parent mosaico.serviceModels
 *
 * @group models/templatesfilled.properties 0 properties
 *
 * @signature `new TemplatesFilled(properties)`
 *   Creates an instance of a model.
 *
 *   @param {Object} properties Initial values for this model's properties.
 */

var TemplatesFilled = bookshelf.Model.extend(
/** @prototype **/
{
	/**
	 * @property {String<"templatesfilled">} models/templatesfilled.properties.tableName tableName
	 * @parent models/templatesfilled.properties
	 *
	 * Indicates which database table Bookshelf.js will query against.
	 **/
	tableName: 'templates_filled',
	/**
	 * @function
	 *
	 * Binds to the "saving" event and specifies [models/templatesfilled.prototype.validateSave validateSave]
	 * as the handler during initialization.
	 **/
	initialize: function(){
		this.on('saving', this.validateSave);
	},
	/**
	 * @function
	 *
	 * Validates that `name` is defined on `this.attributes`.
	 *
	 * @return {Promise}
	 **/
	validateSave: function(){
		return checkit({
			name: 'required'
		}).run(this.attributes);
	}
});

module.exports = TemplatesFilled;
