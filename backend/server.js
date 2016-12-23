var server = require('backend/main')
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
