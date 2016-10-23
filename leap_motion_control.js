"use strict";

var Cylon = require('cylon');

/**
 * This robot sends messages to the hand_motion and key_tap_gesture channel using the leap motion
 */

Cylon.robot({
  connections: {
    server: {adaptor: 'mqtt', host: 'mqtt://localhost:1883'},
    leapmotion: {adaptor: 'leapmotion'}
  },

  devices: {
    leapmotion: {driver: 'leapmotion', connection: 'leapmotion'}
  },

  work: function (my) {
    my.leapmotion.on('hand', (payload)=> {

      var data;
      try{
        data = payload.sphereRadius
      } catch(e) {
        throw new Error(e)
      }

      var now = new Date();
      var dataSet = JSON.stringify({'x': getTimeString(now), 'y': data});
      my.server.publish('hand_motion', dataSet)
    });

    my.leapmotion.on('gesture', (payload)=>{

      var state;
      try{
        state = payload.type
      } catch(e){
        console.log(e)
      }

      if(state == 'keyTap'){
        my.server.publish('key_tap_gesture', state)
      }

    })

  },

  error: (err)=>{
    console.warn("Rats")
  }

}).start();


// Code borrowed from random signal package
var getTimeString = (now)=> {
  var year = "" + now.getFullYear();
  var month = "" + (now.getMonth() + 1);
  if (month.length == 1) {
    month = "0" + month
  }
  var day = "" + now.getDate();
  if (day.length == 1) {
    day = "0" + day
  }
  var hour = "" + now.getHours();
  if (hour.length == 1) {
    hour = "0" + hour
  }
  var minute = "" + now.getMinutes();
  if (minute.length == 1) {
    minute = "0" + minute
  }
  var second = "" + now.getSeconds();
  if (second.length == 1) {
    second = "0" + second
  }
  var ms = "" + now.getMilliseconds();
  while (ms.length < 3) {
    ms = "0" + ms
  }
  return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second + "." + ms;
};