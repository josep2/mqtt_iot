var config = require('./config.json');
var username = config[ 'user' ];
var apiKey = config[ 'apiKey' ];
var token = config[ 'token' ];
var Plotly = require('plotly')(username, apiKey);
var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://localhost:1883');
var stream = require('stream');

// Create a Readable Stream Class to Feed To The Plotly API

class ReadableStream extends stream.Readable {
  constructor () {
    super();
    stream.Readable.call(this, {objectMode: true});
  }

  _read (value, encoding) { // Required
    // console.log("Reading data in…");
  }
}
var myReadStream = new ReadableStream();

// Print Data To The Console To Ensure It's Being Transmitted
myReadStream.on('data', (data)=> {
  console.log(data)
});

myReadStream.on('error', (data)=> {
  console.log("There was an error with the data", data)
});

// Immediately subscribe to events from MQTT in the hand_motion topic
client.on('connect', ()=> {
  client.subscribe('hand_motion')
});

var data = {
  'x': [],
  'y': [],
  'type': 'scatter',
  'mode': 'lines+markers',
  marker: {
    color: "rgba(0, 0, 0, 1)"
  },
  line: {
    color: "rgba(139, 76, 144, 1)"
  },
  stream: {
    "token": token
    , "maxpoints": 200
  }
};

// build your layout and file options

var graphOptions = {
  "filename": "MQTT Stream"
  , "fileopt": "extend"
  , "layout": {
    "title": "Streaming Hand Gestures From Leap Motion"
  }
  , "world_readable": true
};

client.on('message', (topic, message)=> {
  myReadStream.push(message.toString()+'\n');

});

Plotly.plot(data, graphOptions, function (err, resp) {
  if (err) return console.log("ERROR", err);

  console.log(resp);

  var plotlystream = Plotly.stream(token, function () {
  });

  plotlystream.on("error", function (err) {
    console.log("something went wrong")
  });

  // Streaming From MQTT to Plot.ly
  myReadStream.pipe(plotlystream)
});



