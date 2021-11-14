/* ---------------------------
File : client-echo.js
Authors : Ryan Sauge
Date : 14.11.2021
Purpose : Starts a client connecting to the server on the echo route
--------------------------- */

const ws = require('ws');

const client = new ws('ws://localhost:3000/echo');

client.on('open', () => {
  // Causes the server to print "Hello"
  console.log("send message...")
  client.send('Hello');
});

client.on('message', function(msg) {
  console.log("response from server : ", msg);
});

client.on('close', function(msg) {
  console.log("response from server : ", msg);
});
