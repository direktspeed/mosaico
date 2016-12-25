/**
 * @module {Module} mosaico/components/templatesfilled/edit <templatesfilled-edit>
 * @parent mosaico.components
 *
 * @group mosaico/components/templatesfilled/edit.properties 0 properties
 *
 * @description Provides an interface for editing the values of a
 * [mosaico/models/templatesfilled] model.
 *
 * @signature `<templatesfilled-edit {is-admin} />`
 *   Creates a form with inputs for each property in a [mosaico/models/templatesfilled] model.
 *
 *   @param {Boolean} is-admin Configures whether or not admin specific
 *   features are enabled.
 *
 *
 * @body
 *
 * To create a `<templatesfilled-edit>` element pass a boolean like [mosaico/app.prototype.isAdmin]:
 *
 * ```
 * <templatesfilled-edit
 *     {is-admin}="app.isAdmin" />
 * ```
 *
 * ## Example
 *
 * @demo public/components/templatesfilled/edit/edit.html
 *
 **/
var Component = require("can-component");
var TemplatesFilled = require("mosaico/models/templatesfilled");
var DefineMap = require("can-define/map/map");
var $ = require('jquery');
require("bootstrap/dist/css/bootstrap.css!");
require('can-define-backup');
require("can-construct");
require("can-route");


exports.ViewModel = DefineMap.extend("TemplatesFilledEditVM",
{
	jQuery: $,
	/**
	* @property {Boolean} mosaico/components/templatesfilled/edit.isAdmin isAdmin
	* @parent mosaico/components/templatesfilled/edit.properties
	*
	* Configures whether or not admin specific features are enabled.
	**/
	isAdmin: {
		type: 'boolean',
		value: false
	},
	/**
	* @property {mosaico/models/templatesfilled} mosaico/components/templatesfilled/edit.templatesfilled templatesfilled
	* @parent mosaico/components/templatesfilled/edit.properties
	*
	* The model that will be bound to the form.
	**/
	templatesfilled: {
		Type: TemplatesFilled,
		Value: TemplatesFilled
	},
	/**
	 * @property {Promise<mosaico/models/templatesfilled>} mosaico/components/templatesfilled/edit.savePromise savePromise
	 * @parent mosaico/components/templatesfilled/edit.properties
	 *
	 * A [mosaico/models/templatesfilled] model.
	 */
	savePromise: 'any',
	/**
	 * @function saveTemplatesFilled
	 *
	 * Creates/updates the templatesfilled on the server and when successful sets [mosaico/components/templatesfilled/edit.templatesfilled]
	 * to a new [mosaico/models/templatesfilled] model. Fires a "saved" event.
	 *
	 * @param {Event} [ev] A DOM Level 2 event that [`preventDefault`](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault)
	 * will be called on.
	 *
	 * @return {Promise<mosaico/models/templatesfilled>}
	 */
	saveTemplatesFilled: function(ev){
		if (ev) {
			ev.preventDefault();
		}

		var self = this;
		var templatesfilled = this.templatesfilled;
		var promise;

		if(templatesfilled.isNew()) {
			promise = templatesfilled.save().then(function(){
				self.templatesfilled = new TemplatesFilled();
			});
		} else {
			promise = templatesfilled.save();
		}

		promise.then(function(){
			templatesfilled.backup();
			self.dispatch("saved");
		});

		this.savePromise = promise;

		return promise;
	},
	/**
	 * @function cancel
	 *
	 * Restores the [mosaico/models/templatesfilled] model to its state prior to editing.
	 * Fires a "canceled" event.
	 */
	cancel: function() {
		this.templatesfilled = this.templatesfilled.restore();
		this.templatesfilled = '';
		this.dispatch("canceled");
	}
});

exports.Component = Component.extend({
	tag: "templatesfilled-edit",
	view: require("./edit.stache!"),
	ViewModel: exports.ViewModel
});
