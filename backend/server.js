var server = require('backend/main')
var PORT = process.env.PORT || 3000;

server.use(express.static(__dirname + '/../'));

server.listen( PORT, function() {
    console.log('Express server listening on port ' + PORT);
} );

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

server.listen(80)
