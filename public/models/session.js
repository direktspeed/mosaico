/**
 * @module {can-map} mosaico/models/session Session
 * @parent mosaico.clientModels
 *
 * @group mosaico/models/session.properties 0 properties
 */

var connect = require("can-connect");
var $ = require("jquery");
var DefineMap = require("can-define/map/map");
var DefineList = require("can-define/list/list");
var tag = require('can-connect/can/tag/');
var User = require("./user");


var Session = DefineMap.extend('Session', {
	/**
	 * @property {mosaico/models/user} mosaico/models/session.properties.user user
	 * @parent mosaico/models/session.properties
	 *
	 * The [mosaico/models/user] model this session represents.
	 **/
	user: User,
	/**
	 * @function
	 *
	 * Identifies whether or not the [mosaico/models/session.properties.user]
	 * property is an administrator.
	 *
	 * @return {Boolean}
	 **/
	isAdmin: function(){
		return this.user && this.user.isAdmin;
	}
});

/**
 * @constructor {can-list} mosaico/models/session.static.List List
 * @parent mosaico/models/session.static
 */
Session.List = DefineList.extend('SessionList', {"#": Session});

var behaviors = [
	require( "can-connect/constructor/" ),
	require( "can-connect/can/map/" ),
	require( "can-connect/constructor/store/" ),
	require( "can-connect/constructor/callbacks-once/" ),
	require( "can-connect/data/callbacks/" ),
	require( "can-connect/data/parse/" ),
	require( "can-connect/data/url/" )
];

var options = {
	ajax: $.ajax,
	Map: Session,
	List: Session.List,
	//name: "session",
	url: {
		getData: "/services/session",
		createData: "/services/session",
		destroyData: "/services/session",
		contentType: "application/x-www-form-urlencoded"
	}
};

Session.connection = connect( behaviors, options );

tag('session-model', Session.connection);

module.exports = Session;
