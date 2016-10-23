/**
 * This is a simple MQTT server with a Redis Backend
 */
var mosca = require('mosca');

var config = {
  type: 'redis',
  redis: require('redis'),
  db: 12,
  port: 6379,
  return_buffers: true,
  host: "localhost"
};

var moscaSettings = {
  port: 1883,
  backend: config,
  persistence: {
    factory: mosca.persistence.Redis
  }
};

var server = new mosca.Server(moscaSettings);
server.on('ready', setup);

// print connected clients
server.on('clientConnected', function(client) {
  console.log('client connected', client.id);
});

// Print the packet the the console
server.on('published', function(packet, client) {

  try{
    console.log(JSON.parse(packet.payload.toString()))
  } catch(e){
    console.log(packet)
  }
});

// When the server in ready, print a message
function setup() {
  console.log('Mosca server is up and running')
}