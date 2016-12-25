/**
 * @module {Module} mosaico/components/templatesfilled/list <templatesfilled-list>
 * @parent mosaico.components
 *
 * @group mosaico/components/templatesfilled/list.properties 0 properties
 *
 * @description Provides links to the existing [mosaico/models/templatesfilled]s. Enables logged
 * in admin users to create, update, and destroy [mosaico/models/templatesfilled]s.
 *
 * @signature `<templatesfilled-list {is-admin} />`
 *   Renders a list of [mosaico/models/templatesfilled] models.
 *
 *   @param {Boolean} is-admin Configures whether or not admin specific
 *   features are enabled.
 *
 *
 * @body
 *
 * To create a `<templatesfilled-list>` element pass a boolean like [mosaico/app.prototype.isAdmin]:
 *
 * ```
 * <templatesfilled-list
 *     {is-admin}="app.isAdmin" />
 * ```
 *
 * ## Example
 *
 * @demo public/components/templatesfilled/list/list.html
 *
 **/
var Component = require("can-component");
var template = require("./list.stache!");
var DefineMap = require("can-define/map/");

require("bootstrap/dist/css/bootstrap.css!");
require("can-route");

var TemplatesFilled = require("mosaico/models/templatesfilled");

var ViewModel = exports.ViewModel = DefineMap.extend('TemplatesFilledListVM',
{
	/**
	 * @property {Boolean} mosaico/components/templatesfilled/list.isAdmin isAdmin
	 * @parent mosaico/components/templatesfilled/list.properties
	 *
	 * Configures whether or not admin specific features are enabled.
	 **/
	isAdmin: {
		type: 'boolean',
		value: false
	},
	/**
	 * @property {mosaico/models/TemplatesFilled} mosaico/models/templatesfilled editingTemplatesFilled
	 *
	 * holds the current templatesfilled instance that is being edited
	 */
	editingTemplatesFilled: TemplatesFilled,
	/**
	 * @property {Promise<mosaico/models/templatesfilled>} mosaico/components/templatesfilled/list.templatesfilledPromise templatesfilledPromise
	 * @parent mosaico/components/templatesfilled/list.properties
	 *
	 * A [mosaico/models/templatesfilled] model List.
	 */
	templatesfilledPromise: {
		value: function(){
			return TemplatesFilled.getList({orderBy: "name"});
		}
	},
	/**
	 * @function editTemplatesFilled
	 *
	 * Selects a [mosaico/models/templatesfilled] model for editing.
	 *
	 * @param {mosaico/models/templatesfilled} templatesfilled
	 *   The templatesfilled model that will be passed to the `<templatesfilled-edit>`
	 *   component.
	 */
	editTemplatesFilled: function(templatesfilled){
		templatesfilled.backup();
		this.editingTemplatesFilled = templatesfilled;
	},
	/**
	 * @function removeEdit
	 *
	 * Deselects the [mosaico/models/templatesfilled] model being edited.
	 */
	removeEdit: function(){
		this.editingTemplatesFilled = null;
	},
	/**
	 * @function
	 * @description Delete a templatesfilled from the database.
	 * @param {mosaico/models/templatesfilled} templatesfilled The [mosaico/models/templatesfilled] to delete.
	 *
	 * @body
	 *
	 * Use in a template like:
	 * ```
	 * <span class="destroy-btn" ($click)="deleteTemplatesFilled(.)"></span>
	 * ```
	 */
	deleteTemplatesFilled: function (templatesfilled) {
		if (! window.confirm('Are you sure you want to delete this templatesfilled?')) {
			return;
		}
		templatesfilled.destroy();
	}
});

exports.Component = Component.extend({
	tag: "templatesfilled-list",
	view: template,
	ViewModel: ViewModel
});
