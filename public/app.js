/**
 * @module {can-map} mosaico/app AppViewModel
 * @parent mosaico
 *
 * @group mosaico/app.properties 0 properties
 */
import DefineMap from "can-define/map/map";
import "bootstrap/dist/css/bootstrap.css!";
import route from 'can-route';
import Session from './models/session';
import "can-route-pushstate";
import stache from "can-stache";
import 'can-stache/helpers/route';
import "./util/prefilter";
import can from "can-namespace";

window.can = can; // This is just for debugging.

const AppViewModel = DefineMap.extend('App',
{
	/**
	* @property {String} mosaico/app.title title
	* @parent mosaico/app.properties
	* The app title based on current page
	**/
	get title(){
		return "Mosaico | " + this.pageComponentConfig.title;
	},
	/**
	* @property {String} mosaico/app.title title
	* @parent mosaico/app.properties
	* The app title based on current page
	**/
	get name(){
		//return require('./package.json').name;
		return "mosaico"
	},
	/**
	* @property {String} mosaico/app.page page
	* @parent mosaico/app.properties
	* Current page
	**/
	page: 'string',
	/**
	* @property {Number} mosaico/app.gameId gameId
	* @parent mosaico/app.properties
	* Current GameID
	**/
	gameId: 'number',
	/**
	* @property {Number} mosaico/app.tournamentId tournamentId
	* @parent mosaico/app.properties
	* Current tournament id
	**/
	tournamentId: 'number',
	/**
	* @property {Promise} mosaico/app.pagePromise pagePromise
	* @parent mosaico/app.properties
	* Promise object
	**/
	pagePromise: {
		value: undefined,
		serialize: false
	},
	/**
	* @property {object} mosaico/app.pageComponentConfig pageComponentConfig
	* @parent mosaico/app.properties
	* page specific config object
	**/
	get pageComponentConfig() {
		var page = this.page;
		if(this.gameId) {

			return {
				title: "Game",
				componentName: "game-details",
				attributes: "{game-id}='./gameId'  {session}='./session' {^game-promise}='./pagePromise'",
				moduleName: "game/details/"
			};

		} else if(this.tournamentId) {
			return {
				title: "Tournament",
				componentName: "tournament-details",
				attributes: "{tournament-id}='./tournamentId' {is-admin}='./isAdmin' {^tournament-promise}='./pagePromise'",
				moduleName: "tournament/details/"
			};

		} else if(page === "tournaments") {
			return {
				title: "Tournaments",
				componentName: "tournament-list",
				attributes: "{is-admin}='./isAdmin'",
				moduleName: "tournament/list/"
			};

		} else if(page === "users") {
			return {
				title: "Users List",
				componentName: "user-list",
				attributes: "{session}='./session'",
				moduleName: "user/list/"
			};

		} else if(page === "register" || page === "account") {
			return {
				title: "Account",
				componentName: "user-details",
				attributes: "{(session)}='./session'",
				moduleName: "user/details/"
			};

		} else if(page === "players"){
			return {
				title: "Players",
				componentName: "player-list",
				attributes: "{is-admin}='./isAdmin'",
				moduleName: "player/list/"
			};

		} else if(page === "templatesfilled"){
			return {
				title: "TemplatesFilled",
				componentName: "templatesfilled-list",
				attributes: "{is-admin}='./isAdmin'",
				moduleName: "templatesfilled/list/"
			};

		} else if(page === "newtemplate"){
				return {
					title: "New Email Template",
					componentName: "templatesfilled-create",
					attributes: "{is-admin}='./isAdmin'",
					moduleName: "templatesfilled/create/"
				};

		} else if(page === "edittemplate"){
				return {
					title: "New Email Template",
					componentName: "templatesfilled-edit",
					attributes: "{is-admin}='./isAdmin'",
					moduleName: "templatesfilled/edit/"
				};


		} else {
			return {
				title: "Page Not Found",
				componentName: "four-0-four",
				attributes: "",
				moduleName: "404.component!",
				statusCode: 404
			};
		}
	},
	/**
	* @property {mosaico/models/session} mosaico/app.session session
	* @parent mosaico/app.properties
	* The session if one exists.
	**/
	session: {
		serialize: false,
		value: function() {
			var self = this;
			Session.get({}).then(function(session){
				self.session = session;
			});
		}
	},
	/**
	* @property {Number} mosaico/app.statusCode statusCode
	* @parent mosaico/app.properties
	* The status code used for server-side rendering.
	**/
	statusCode: {
		get: function(lastSet, resolve) {
			var pageConfig = this.pageComponentConfig;

			if(pageConfig.statusCode) {
				return pageConfig.statusCode;
			}

			var pagePromise = this.pagePromise;
			if(pagePromise){
				// pagePromise is guaranteed to be resolved here
				// because done-ssr will not call the statusCode
				// getter until the app is done loading
				return pagePromise.then(function(){
					resolve(200);
				}, function(){
					resolve(404);
				});
			}else{
				return 200;
			}
		}
	},
	/**
	 * @function isAdmin
     *
	 * @return {Boolean} The value of `user.isAdmin` on the [mosaico/app.session]
	 * model, if present. Otherwise, `false`.
	 */
	isAdmin: function (){
		var session = this.session;
		if(session) {
			if(session.user) {
				return session.user.isAdmin;
			} else {
				return false;
			}
		}
		return false;
	}

});

stache.registerHelper("pageComponent", function(options){
	var pageComponent = options.context.pageComponentConfig,
		template =
			"<can-import from='mosaico/components/" + pageComponent.moduleName + "'>" +
				"{{#if isResolved}}" +
					"{{#with ../.}}<"+pageComponent.componentName + " " + pageComponent.attributes + "/>{{/with}}" +
				"{{else}}" +
					"Loading..." +
				"{{/if}}" +
			"</can-import>";
	return stache(template)(this, options.helpers, options.nodeList);
});

route('tournaments/{tournamentId}');
route('games/{gameId}');
route('{page}',{page: 'templatesfilled'});

export default AppViewModel;
