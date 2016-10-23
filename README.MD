# MQTT Streaming Application Prototype

This repository contains code for an Internet Of Things Proof of Concept.
You can read about the project here: http://bit.ly/jowmqtt



### Dependencies 

* Node.js 4.0 or greater
* Scala 2.11.8
* Redis 
* SBT
* Spark 2.0.1
* Plot.ly API Key
* Philips Hue Lighting System 
* Leap Motion Controller



### Running

Pull the project down and run `npm install`

Before running anything you'll need to configure your config.json file in the root directory.

Here is an example:

`{
  "user": YOUR_PLOTLY_USER_NAME,
  "apiKey": YOUR_PLOTLY_API_KEY,
  "token": YOUR_PLOTLY_STREAMING_TOKEN,
  "hueHost": YOUR_HUE_HOST_ADDRESS,
  "hueUser": YOUR_HUE_USER_ID
}`
 
To start the MQTT server `node mqtt_server.js` 
To start the hue listener `node hue_control.js`
To start the Leap Motion `node leap_motion_control.js`
To start the Plot.ly server `node livestream.js`
 

To run Spark Streaming from the `mqtt_spark_streaming` directory run `sbt run`

Spark Streaming will calculate descriptive statistics in a 5 second window.



###License



Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

