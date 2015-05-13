var Hapi = require('hapi');

// Create a server with a host and port
// https://github.com/hapijs/discuss/issues/57#issuecomment-68357551
var server = new Hapi.Server({
	connections: {
		routes: {
			cors: true
		}
	}
});
server.connection({
	host: '0.0.0.0',
	port: ~~process.env.PORT || 5000
});

// Add the route
server.route({
	method: 'GET',
	path: '/games/1',
	handler: function (request, reply) {
		var data;
		var proto = request.headers['x-forwarded-proto'] ? request.headers['x-forwarded-proto'] : request.server.info.protocol;

		data = JSON.stringify(require('./game.json'))
				.replace(/{{host}}/g, request.info.host)
				.replace(/{{protocol}}/g, proto);

		reply(data);
	}
});
server.route({
	method: 'GET',
	path: '/{param*}',
	handler: {
		directory: {
			path: 'public'
		}
	}
});

// Start the server
server.start();