var Hapi = require('hapi');

// Create a server with a host and port
var server = new Hapi.Server();
server.connection({
	host: '0.0.0.0',
	port: ~~process.env.PORT || 5000
});

// Add the route
server.route({
	method: 'GET',
	path: '/games/1',
	handler: function (request, reply) {
		var data = JSON.stringify(require('./game.json'))
					.replace(/{{host}}/g, request.info.host);

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