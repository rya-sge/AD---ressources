/*
---------------------------
File : server.js
Authors : Ryan Sauge
Date : 15.11.2021
Purpose : Starts a websocket server listening on port 3000
Sources :
https://masteringjs.io/tutorials/express/websockets
https://stackoverflow.com/questions/22429744/how-to-setup-route-for-websocket-server-in-express
--------------------------- */


var express = require('express');
var app = express();

/*
app: The Express application to set up express-ws on.
 */
var expressWs = require('express-ws')(app);

/*
Define a middleware
 */
app.use(function (req, res, next) {
  console.log('middleware');
  req.testing = 'testing';
  return next();
});



//Define a rout for /
app.get('/', function(req, res, next){
  console.log('get route', req.testing);
  res.end();
});

//Define a route for echo
app.get('/echo', function(req, res, next){
  console.log('get route echo', req.testing);
  res.end();
});

app.ws('/', function(ws, req) {
  console.log('socket', req.testing);
  ws.on('message', function(msg) {
    console.log(msg);
  });
  /*
  Don't work, I don't know why
  ws.on('open', () => {
    console.log('WebSocket was open');
  });*/
  ws.on('close', () => {
    console.log('WebSocket was closed');
  });

  /*
  This functions hasn't tested
   */
  ws.on('error', () => {
    console.log('WebSocket has generated an error');
  });
});

app.ws('/echo', (ws, req) => {
  ws.on('message', msg => {
    console.log("Message received : ", msg)
    ws.send(msg);
  });

  ws.on('close', () => {
    console.log('WebSocke echo was closed');
  });

  ws.on('error', () => {
    console.log('WebSocket echo has generated an error');
  });
})



app.listen(3000);
