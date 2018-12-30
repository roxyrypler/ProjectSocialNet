console.log("Hello");

var express = require('express');

var app = express();

var server = app.listen(process.env.PORT || 3000, listen);


function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://' + host + ':' + port);
}

app.use(express.static('public'));



var io = require('socket.io')(server);


io.sockets.on('connection', function (socket) {
    
    
    
    
    socket.on("Sending", (data) => {
       console.log("Motatt melding: " + data); 
    
        socket.broadcast.emit("sendToOthers", data);
    });
    
    
    
    
    
    
    
    
    
//    console.log("We have a new client: " + socket.id);
//    socket.on('mouse', function(data) {
//        console.log("Received: 'mouse' " + data.x + " " + data.y);
//        socket.broadcast.emit('mouse', data);
//      }
//    );
//    
//    socket.on('disconnect', function() {
//      console.log("Client has disconnected");
//    });
    }
);