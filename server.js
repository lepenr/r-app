var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var sensor = require("ds18b20");

app.get("/", function(req, res) {
  //send the index.html file for all requests
  res.sendFile(__dirname + "/public/index.html");
});

app.use(express.static(__dirname + "/public"));

http.listen(3001, function() {
  console.log("listening on *:3001");
});

function precise(x) {
  return Number.parseFloat(x).toPrecision(5);
}

//for testing, we're just going to send data to the client every second
setInterval(function() {
/*
    our message we want to send to the client: in this case it's just a random
    number that we generate on the server
  */
//
//
var msg = sensor.temperatureSync("28-031722c313ff", { parser: "hex" });
var msg2 = sensor.temperatureSync("28-031722cedeff", { parser: "hex" });
var msg3 = precise(msg2);
console.log(precise(3.456));
console.log(precise(msg2));
//var msg = Math.random();
//  io.emit("message", msg);
console.log(msg2);
console.log(precise(msg));
io.emit("message", {msg, msg2 });
}, 100);
