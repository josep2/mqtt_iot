var Cylon = require('cylon');
var config = require('./config.json');

/**
 * This Robot is subscribed key_tap_gesture topic and will toggle on and off. It will send its state as a message
 * to the light_state topic
 */

Cylon.robot({
  connections: {
    server: {adaptor: 'mqtt', host: 'mqtt://localhost:1883'},
    hue: { adaptor: 'hue', host: config.hueHost, username: config.hueUser }
  },

  devices: {
    bulb: { driver: 'hue-light', lightId: 6, connection: 'hue' }
  },

  work: function (my) {

    my.server.subscribe('key_tap_gesture');

    my.server.on('message', (topic, data)=>{
      my.bulb.toggle();

      my.server.publish('light_state', JSON.stringify({'isOn': my.bulb.isOn}))
    });

  }

}).start();