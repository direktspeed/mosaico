var express = require('express');
var server = require('./services/app');
var exec = require( "child_process" ).exec;
var cookieParser = require('cookie-parser');
var path = require("path");

server.locals = {
	emailTransport: {
		// host: 'yoursmtpserver',
		// port: 25,
		// auth: { user: '####', pass: '####' }
	},
	emailOptions: {
		from: 'Mosaico by VOXmail <test@mosaico.io>', // sender address
		// bcc: 'mosaico@mosaico.io',
	}
};

server.set('port', (process.env.PORT || 5000));

server.use( express.static(__dirname + '/public') );

server.use(cookieParser());

if ( process.argv.indexOf( "--slow" ) !== -1 ) {
	console.log("Delaying everything 1 second");
	server.use( function ( req, res, next ) {
		setTimeout(next, 1000);
	});
}

require('./services/session');

require('./services/games');
require('./services/players');
require('./services/stats');
require('./services/teams');
require('./services/tournaments');
require('./services/users');
require('./services/templatesfilled');

//can-ssr:
server.use( "/", require('./public/ssr') );

server.listen(server.get('port'), function() {
  console.log('Node app is running on port', server.get('port'));
});

if ( process.argv.indexOf( "--develop" ) !== -1 ) {
  //is dev mode so do live reload
  var child = exec( path.join("node_modules",".bin","steal-tools live-reload"), {
    cwd: process.cwd() + "/public"
  });

  child.stdout.pipe( process.stdout );
  child.stderr.pipe( process.stderr );
}
