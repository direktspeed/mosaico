/**
 * @module {Module} mosaico/components/navigation <mosaico-navigation>
 * @parent mosaico.components
 *
 * @group mosaico/components/navigation.properties 0 properties
 *
 * @description Provides navigation between different parts of the app
 * and lets a user login or logout.
 *
 * @signature `<mosaico-navigation {app}/>`
 *   Creates the navigation for Mosaico.
 *
 *   @param {mosaico/app} app The application viewModel.  This component
 *   will read and set the `session` property on the [mosaico/app].
 *
 *
 * @body
 *
 * To create a `<game-details>` element pass the [mosaico/models/session]
 * and a [mosaico/models/game] id like:
 *
 * ```
 * <mosaico-navigation
 *     {app}="." />
 * ```
 *
 * ## Example
 *
 * @demo public/components/navigation/navigation.html
 *
 */
var Component = require("can-component");
var Session = require("mosaico/models/session");
var User = require("mosaico/models/user");
var $ = require("jquery");
var DefineMap = require("can-define/map/map");

require("bootstrap/dist/css/bootstrap.css!");
require("bootstrap/js/dropdown");
require("can-route");
require("./navigation.less!");


var ViewModel = DefineMap.extend('NavigationVM',
{
	/**
	 * @property {mosaico/app} mosaico/components/navigation.app app
	 * @parent mosaico/components/navigation.properties
	 *
	 * The [mosaico/app] used to add or destroy the session.
	 */
	app:  'any',
	/**
	* @property {Promise<mosaico/models/session>} mosaico/components/navigation.sessionPromise sessionPromise
	* @parent mosaico/components/navigation.properties
	*
	* The promise that resolves when the user is logged in.
	*/
	sessionPromise: 'any',
	/**
	 * @property {mosaico/models/session} mosaico/models/session session
	 * 
	 * Current session for the app
	 */
	session: Session,
	/**
	 * @property {mosaico/models/session} mosaico/components/navigation.loginSession loginSession
	 * @parent mosaico/components/navigation.properties
	 *
	 * A placeholder session with a nested [mosaico/models/user user] property that
	 * is used for two-way binding the login form's username and password.
	 */
	loginSession: {
		value: function(){
			return new Session({user: new User()});
		}
	},
	/**
	 * @function createSession
	 *
	 * Creates the session on the server and when successful updates [mosaico/components/navigation.app]
	 * with the session. Sets [mosaico/components/navigation.sessionPromise].
	 * @param {Event} [ev] Optional DOM event that will be prevented if passed.
	 */
	createSession: function(ev){
		if(ev) {
			ev.preventDefault();
		}
		var self = this;
		var sessionPromise = this.loginSession.save().then(function(session){
			self.loginSession = new Session({user: new User()});
			self.app.session = session;
		});
		this.sessionPromise = sessionPromise;
	},
	/**
	 * @function logout
	 *
	 * Destroys [mosaico/components/navigation.app]'s [mosaico/models/session] and
	 * then removes it from the session.
	 */
	logout: function(){
		var sessionPromise = this.app.session.destroy();
		this.sessionPromise = sessionPromise;
		this.app.session = null;
	},
	/**
	 * @function closeDropdown
	 * Closes the dropdown.  Needed for when someone clicks on register.
	 */
	closeDropdown: function ( el ) {
		$( el ).closest( ".session-menu" ).find( ".open .dropdown-toggle" ).dropdown( "toggle" );
	}
});

Component.extend({
	tag: "mosaico-navigation",
	view: require("./navigation.stache!"),
	ViewModel: ViewModel
});

exports.ViewModel = ViewModel;
